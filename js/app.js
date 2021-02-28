const drumSoundkit=[
    {keyName:"Q",
    name:"Basse",
    source:new Audio("./audio/Basse.mp3"),
    code:81,
    },
    {keyName:"W",
    name:"Bongo",
    source:new Audio("./audio/Bongo.mp3"),
    code:87},
    {keyName:"E",
    name:"Caisse claire",
    source:new Audio("./audio/CaisseClaire.mp3"),
    code:69},
    {keyName:"A",
    name:"Charley",
    source:new Audio('./audio/Charley.mp3'),
    code:65},
    {keyName:"S",
    name:"Claves",
    source:new Audio('./audio/Claves.mp3'),
    code:83},
    {keyName:"D",
    name:"Grosse caisse",
    source:new Audio("./audio/GrosseCaisse.mp3"),
    code:68},
    {keyName:"Z",
    name:"Ride",
    source:new Audio('./audio/Ride.mp3'),
    code:90},
    {keyName:"X",
    name:"Tambourin",
    source:new Audio("./audio/Tambourin.mp3"),
    code:88},
    {keyName:"C",
    name:"Toms",
    source:new Audio("./audio/Toms.mp3"),
    code:67}
]

Vue.component('Piano',{
    template :`
<div id="piano">
    <button 
        class="drum-pad"
        v-for="({name,source,code},index) in drumSoundkit"
        :key="index"
        :id="letter(code)+'-'+index"
        @click="e => playSound(code,source,name)">

        {{ letter(code) }}

        <audio
            class="clip"
            :id="letter(code)"
            :src="source.src"/>
    </button>    
</div>
    
    `,    

    methods:{
        letter: key =>String.fromCharCode(key),

        playSound(aKey){
            const key = this.letter(aKey)
            this.addClassOnPlay(key)
        },

        addClassOnPlay(key){
            const element = document.getElementById(key)            
            const displaySound=document.getElementById('display')           
            for (let i=0;i<drumSoundkit.length;i++){
                if (drumSoundkit[i].keyName===key){
                    displaySound.textContent=drumSoundkit[i].name
                }
            }            
            this.$emit('currentElement',element)
            element.play()
            element.currentTime=0
        }
    },
    created(){
        window.addEventListener('keydown', e =>{
            let keydown=(e.key.toUpperCase())           
            for (let i=0; i<drumSoundkit.length;i++){
                if(drumSoundkit[i].keyName===keydown){
                    this.addClassOnPlay(keydown)
                }
            }            
        }
    )}          
})

Vue.component('DrumMachine',{
    template:`
<div id="drum-machine">
    <div id="piano-container"> 
        <Piano
        @currentElement="currentElement=$event"/>  
    </div>

    <div id="display-container">
        <div id="display" v-bind:class="color" v-bind:style="{color:new_color}">  {{ nameSound }} </div>
    </div>
</div>`,

    data(){
        return{
        nameSound:'',        
        currentElement:null,
        new_color:''}
    },
    computed: {
        color: function () {
            let colorA = Math.floor(Math.random() * Math.floor(255))
            let colorB = Math.floor(Math.random() * Math.floor(255))
            let colorC = Math.floor(Math.random() * Math.floor(255))
            this.new_color = `rgb(${colorA},${colorB},${colorC})`
        }
    },
    
    watch:{currentElement : function(){
        let colorA=Math.floor(Math.random() * Math.floor(255))
        let colorB=Math.floor(Math.random() * Math.floor(255))
        let colorC=Math.floor(Math.random() * Math.floor(255))
        this.new_color=`rgb(${colorA},${colorB},${colorC})`
        return
               
              
    }
}
})

const app = new Vue({
    el:"#drum-machine",
    
    template:`
    <div class="app-container">
        <header>
            <h1> Boite à rythme </h1>
        </header>
        <DrumMachine />       
    </div>
        `})