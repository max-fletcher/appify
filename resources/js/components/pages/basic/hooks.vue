<template>
    <div>
        <h1 ref="myref"> Hooks Tutorial </h1>
        <p> My name is: {{ name }} </p>
    </div>
</template>

<script>
export default {
    data(){
        return{
            name: 'John',
        }
    },

    beforeCreate(){        
        console.log("Before Created");
    },
    created(){
        // Call mostly initial data from this
        console.log("Data and other functions avaliable but not html", this.name);
    },
    mounted(){
        console.log("We can manipulate html with this one", this.$refs.myref);
    }
}
</script>

<style>

</style>