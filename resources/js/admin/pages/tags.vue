<template>
      <div>
		<div class="content">
			<div class="container-fluid">				
				<!--~~~~~~~ TABLE ONE ~~~~~~~~~-->
				<div class="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20">
					<span class="_title0" style="margin-right: 10px"> Tags </span><Button @click="addModal=true"><Icon type="ios-add" />Add Tag</Button>

					<div class="_overflow _table_div">
						<br>
						<table class="_table">
								<!-- TABLE TITLE -->
							<tr>
								<th>ID</th>
								<th>Tag name</th>
								<th>Created at</th>
								<th>Action</th>
							</tr>
								<!-- TABLE TITLE -->


								<!-- ITEMS -->
							<!-- Note that index and tag.id CAN be different so we will need to use tag.id to pass requests to server and use
							index to modify the DOM(e.g rows on the table)-->
							<tr v-for="(tag, index) in tags" :key="index" v-if="tags.length">
								<td>{{tag.id}}</td>
								<td class="_table_name">{{tag.tagName}}</td>
								<td>{{tag.created_at}}</td>
								<td>
									<Button type="info" size="small" @click="showEditModal(tag, index)"> Edit </Button>
									<!-- :loading is used to set iView to tack on a loader animation to this button-->
									<Button type="error" size="small" @click="showDeleteModal(tag, index)"> Delete </Button>
								</td>
							</tr>
								<!-- ITEMS -->
					</table>
					</div>
				</div>

				<!-- tag adding modal -->
				<Modal
					v-model="addModal"
					title="Add tag"										
					>
					<Input v-model="data.tagName" placeholder="Add tag name"  />
					<div slot="footer">
						<Button type="default" @click="addModal=false">Close</Button>
						<Button type="primary" @click="addTag" :disabled="isAdding" :loading="isAdding">{{isAdding ? 'Adding...' : 'Add tag'}}</Button>
					</div>
				</Modal>

				<!-- tag edit modal -->
				<Modal
					v-model="editModal"
					title="Edit tag"										
					>
					<Input v-model="editData.tagName" placeholder="Edit tag name"  />
					<div slot="footer">
						<Button type="default" @click="editModal=false">Close</Button>
						<!-- I think you can use v-show or v-if instead of :disabled -->
						<Button type="primary" @click="editTag" :disabled="isAdding" :loading="isAdding">{{isAdding ? 'Editing...' : 'Edit tag'}}</Button>
					</div>
				</Modal>

				<!-- tag delete modal -->
				<Modal v-model="deleteModal" width="360">
					<p slot="header" style="color:#f60;text-align:center">
						<Icon type="ios-information-circle"></Icon>
						<span>Confirm Delete</span>
					</p>
					<div style="text-align:center">						
						<p> Are you sure you want to delete this tag ? </p>
					</div>
					<div slot="footer">
						<Button type="error" size="large" long :loading="isDeleting" :disabled="isDeleting" @click="deleteTag"> Delete </Button>
					</div>
				</Modal>

			</div>
		</div>
	</div>
</template>

<script>
//import methodsVue from './pages/basic/methods.vue'
export default {

	data(){
		return{
			data: {
				tagName: ''
			},
			addModal: false,
			editModal: false,
			deleteModal: false,
			isAdding: false,
			isDeleting: false,
			tags: [],
			editData: {
				tagName: ''
			},
			deleteData: {},
			index: -1,
			deletingIndex: -1,
		}
	},

	methods: {
		async addTag(){			
			if(this.data.tagName.trim()=='')return this.InfoN('Tag name is required')
				const response = await this.callApi('post', 'app/create_tag', this.data )
				if(response.status===201){
					// Unshifting so that new data(tag) is added to the tags array after posting to database
					this.tags.unshift(response.data)
					this.successN('The tag has been added successfully !!')
					this.addModal = false
					this.data.tagName = ''					
				}else{
					if(response.status==422){
						if(response.data.errors.tagName){
							this.infoN(response.data.errors.tagName[0])
						}
					}
					else{
						this.swrN()
					}
				}
			},

			async editTag(){
			if(this.editData.tagName.trim()=='')return this.InfoN('Tag name is required')
				const response = await this.callApi('patch', 'app/edit_tag', this.editData)
				if(response.status===200){										
					this.tags[this.index].tagName = this.editData.tagName
					this.successN('The tag has been edited successfully !!')
					this.editModal = false
				}else{
					if(response.status==422){
						if(response.data.errors.tagName){
							this.infoN(response.data.errors.tagName[0])
						}
					}
					else{
						this.swrN()
					}
				}
			},

			async deleteTag(){	
				// Add a 'isDeleting' row in the 'tag' array and set it equal to 'true'
				this.isDeleting = true
				const response = await this.callApi('delete', 'app/delete_tag', this.deleteData)
				if(response.status===200){										
					this.tags.splice(this.deletingIndex, 1)
					this.successN('The tag has been deleted successfully !!')					
				}else{				
					this.swrN()
				}
				this.isDeleting = false
				this.deleteModal = false		
			},			

			showEditModal(tag ,index){			
	// Using an intermediate array to store so that the background list is not updated when typing into the edit tag input box We 
	// basically don't want to pass say this.editData = tag since the tag will be passed by reference and any changes to tag will 
	// cause the background tagName to change. So we are copying the tag into obj then passing obj as reference to the editData variable
				let obj = {
					id : tag.id,
					tagName : tag.tagName
				}
				this.editData = obj
				this.editModal = true
				this.index = index				
			},

			showDeleteModal(tag ,index){		
				this.deleteData = tag														
				this.deleteModal = true
				this.deletingIndex = index
			}			
	},

	async created(){		
		const response = await this.callApi('get', 'app/get_tags')
			if(response.status===200){
				this.tags = response.data						
			}else{
				this.swrN()
			}
		}
	}

	// Testing axios request using callApi function from common.js
	// async created() {
	// 	const res = await this.callApi('post', 'app/create_tag', {tagName: 'testtag'});		
	// 	//console.log(res)
	// 	if(res.status == 200){
	// 		console.log(res)
	// 	}
	// 	else{
	// 		console.log('running')
	// 		console.log(res)
	// 	}
	// }
</script>

<style>

</style>
