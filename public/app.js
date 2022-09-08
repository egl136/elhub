const vm = Vue.createApp({
    data(){
        return {
            mail:string = 'John',
            passwd:string = 'Loa',
            loginStatusText:string = "Not logged yet",
            loginStatus:boolean = false,
            data:json = {},
            contentIndex:number = 0
        }
    },
    methods:{
        /*fullName(){
            return 'Email: ' + this.mail + ' Passwd: ' + this.passwd
        },*/
        async login(){
            this.loginStatusText = "Loggin In..."
            let mail = this.mail
            let passwd = this.passwd
            let _post = {
                usuinput: mail,
                pasinput: passwd
            }
            console.log(JSON.stringify(_post))
            let response = await fetch('login/action', {
                method: "POST",
                body: JSON.stringify(_post),
                headers: {'Content-type': 'application/json'}
            })
            const responseText = await response.json().then(jsonR => this.json=jsonR)
            if(this.json.failed){
                this.loginStatusText = this.json.error_msg
            }else{
                this.loginStatusText = "Bienvenido, "+this.json.user.name
            }
        }
    }
}).mount("#app")





