<template>
    <div>
        <h1> Methods </h1>
        <h2> Counter </h2>
        <h5> Count is :  {{ counter }} </h5>
        <button @click="updateCounter(1)"> Increase </button>
        <button @click="updateCounter(-1)"> Decrease </button>        
        <br><br>

        <h2> Showing an array </h2>
        <div v-for="(blog, index) in blogs" :key="index" v-if="blogs.length">
             <h1> {{ blog.title }} </h1> 
             <p> {{ blog.body }} </p>
        </div>
        <br><br>

        <h2> Conditionals </h2>
        <div>
            <h2 v-if="showItem"> Show this item if "showItem" is true </h2>
            <h2 v-else="!showItem"> Show this item if "showItem" is false </h2>
            <button @click="showItem = !showItem"> Toggle Inline Function </button>
            <button @click="toggleShowItem()"> Toggle discrete Function </button>
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return{
            counter: 0,  
            blogs: [],
            showItem: true,
        }
    },

    methods:{
        updateCounter: function(num){
            this.counter += num;
        },

        toggleShowItem: function(){
            this.showItem = !this.showItem;
        }
    },

    created(){
        this.counter = 100;
        //get blog posts
        let posts = [{title: "This is post 1", body: "This is the body of post 1", id: 1},
                    {title: "This is post 2", body: "This is the body of post 2", id: 2},
                    {title: "This is post 3", body: "This is the body of post 3", id: 3},
                    {title: "This is post 4", body: "This is the body of post 4", id: 4},
                    {title: "This is post 5", body: "This is the body of post 5", id: 5},
        ];
        this.blogs = posts;

    }
}
</script>

<style>

</style>