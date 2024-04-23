<template>
    <div class="bg-white text-sky-800 py-4 px-4 shadow md:flex justify-between item-center"> 
        <div class="logo text-2xl font-bold text-sky-800 cursor-pointer"> 
            <h1> Course-Online </h1>
        </div>
        <ul class="md:flex md:items-center">
            <li :key="link.name" class="md:mx-4" v-for="link in Links">
                <a :href="link.link" class="text-xl text-sky-800 hover:text-sky-500">{{ link.name }}</a>
            </li>
      
        </ul>
    </div>
     
    </template>
    
    <script>
    export default { 
        setup() {
            const Links = [
                {name: "Home", link: "#"},
                {name: "All Course", link: "#"},
                {name: "Login", link: "#"},
                {name: "Register", link: "#"},
            ];
            
            return { Links };
        }
    }
    </script>
    