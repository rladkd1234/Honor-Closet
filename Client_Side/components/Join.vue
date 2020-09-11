<template>
    <div id="join">
        <div id="joinform">
            <table id="signup_box" frame=void>
                <tr>
                    <td class="category">회원구분</td>
                    <td class="answer"><input type="radio" name="job" value="1" v-model="userInfo.Specification"> 학생 <input type="radio" name="job" value="2" v-model="userInfo.Specification"> 교직원</td>
                </tr>
                <tr>
                    <td class="category">이메일</td>
                    <td class="answer"><input type="text" size="35" name="userid" placeholder="이메일@" v-model="userInfo.E_mail">
                    <button class="idCheckBtn">아이디 중복확인 ></button>
                    <!-- <i>(영문소문자/숫자, 4~6자)</i> -->
                    </td>
                </tr>
                <tr>
                    <td class="category">비밀번호</td>
                    <td class="answer"><input type="password" size="35" name="userpw" placeholder="비밀번호" v-model="userInfo.Password"></td>
                </tr>
                <tr>
                    <td class="category">비밀번호 확인</td>
                    <td class="answer"><input type="password" size="35" name="confirm_userpw" placeholder="비밀번호 확인" v-model="passwordCheck"></td>
                </tr>
                
                <tr>
                    <td class="category">이름</td>
                    <td class="answer"><input type="text" size="35" name="name" placeholder="이름" v-model="userInfo.Name"></td>
                </tr>
                <tr>
                    <td class="category">휴대전화</td>
                    <td class="answer">
                        <select name="start_num" v-model="numbers1">
                            <option v-for="num in Numbers" :key="num" :value="num">{{num}}</option>
                        </select>
                            - <input type="text" name="middle_num" class="text_box" v-model="numbers2"> - <input type="text" name="last_num" class="text_box" v-model="numbers3">
                    </td>
                </tr>
                <!-- <tr>
                    <td class="category">이메일</td>
                    <td class="answer"><input type="text" name="email_id"> @ <input type="text" name="email" :value="Email">
                        <select class="selectEmail" name="emadress" v-on:change="InputEmail($event)">
                            <option v-for="mail in Emails" :key="mail.name" :value="mail.value" >{{mail.name}}</option>
                        </select>
                    </td>
                </tr> -->
                <tr>
                    <td class="category">성별</td>
                    <td class="answer"><input type="radio" name="sex" value="0" v-model="userInfo.Sex"> 남자 <input type="radio" name="sex" value="1" v-model="userInfo.Sex"> 여자 </td>
                </tr>
                <tr>
                    <td class="category">생년월일</td>
                    <td class="answer">
                        <input type="text" name="year" class="text_box" v-model="birth_y"><i>년</i><input type="text" name="month" class="text_box" v-model="birth_m"><i>월</i><input type="text" name="day" class="text_box" v-model="birth_d"><i>일</i>
                        <input type="radio" name="calender" value="1" v-model="userInfo.isSolar"> 양력 <input type="radio" name="calender" value="0" v-model="userInfo.isSolar"> 음력
                    </td>
                </tr>
            </table>
            <div id="btns" >
                <!--<router-link to="/complete" tag="button" id="sign_up_btn" @click.native="onsignUp">확인</router-link> -->
                <button id="sign_up_btn" @click="onsignUp">확인</button>
                <modal v-if="showModal" @close="showModal = false"><!--
                    you can use custom content here to overwrite
                    default content
                    -->
                    <h3 slot="header">알림!</h3>
                    <div slot="body">
                        {{ msg }}
                    </div>
                </modal>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import Modal from './commons/Modal'
export default {
    data(){
        return{
            userInfo : {    //내용 더 추가할 것.
                E_mail:"", 
                Password:"",
                Name:"", 
                Sex:"",
                Specification:"",
                Birth:"",
                isSolar:"",
                PhoneNum:"",
            },
            Email: "",
            Emails: [
                {value:'', name: '직접입력'},
                {value:'kumoh.ac.kr', name:'kumoh.ac.kr'},
                {value:'naver.com', name:'naver.com'},
                {value:'hanmail.net', name:'hanmail.net'},
                {value:'gmail.com', name:'gmail.com'},
            ],
            Numbers:['010', '011'],
            numbers1:"",
            numbers2:"",
            numbers3:"",
            birth_y:"",
            birth_m:"",
            birth_d:"",
            showModal: false,
            passwordCheck: "",
            msg : " "
        }
    },
    components : {
        Modal,
    },
    methods:{
        InputEmail: function(e){
            this.Email = e.target.value;
        },
        onsignUp() {
            /* 비밀번호확인 */
            if(this.userInfo.Password != this.passwordCheck){
                this.msg = "비밀번호를 다시 확인해 주세요"
                this.showModal = true
            }
            else if(!(1900 <= this.birth_y  && this.birth_y <= 2019 && 1 <= this.birth_m && this.birth_m <= 12 && 1 <= this.birth_d && this.birth_d <= 31)){
                this.msg = "생년월일을 정확히 기입해주세요"
                this.showModal = true
            }
            /* 다채웟는지 확인하기 */
            /* 날짜 제대로 넣었는지 확인하기 */
            this.userInfo.PhoneNum = this.numbers1 + "-" + this.numbers2 + "-" + this.numbers3;
            this.userInfo.Birth = ""+this.birth_y+this.birth_m+this.birth_d;
            this.$store.dispatch('signUp', this.userInfo)
            .then(()=>{
                if(this.$store.state.joinStatus =="ALREADY")
                {
                    //modal 추가    
                    this.msg = "아이디가 겹칩니다."
                    this.showModal = true
                    console.log("id is Already. please retry")
                } else if(this.$store.state.joinStatus =="SUCCESS"){
                    this.$router.push('/complete')
                }
            })
            .catch((response) => {
                console.log('request fail')
            })
        }
    }
}
</script>

<style scoped>
    #join{
        min-height: 100vh;
        height: calc(100vh-89px);
        display: table;
        margin: auto;
    }
    #joinform{
        display: table-cell;
        vertical-align: middle;
    }
    #btns{
        padding-top: 10vh;
        text-align: center;
    }
    #sign_up_btn{
        font-size: 1.45vw;
        width: 13.75vw;
        height: 44px;
        background-color: rgb(118,112,112);
        color: white;
    }
    .joinForm{
        display: table;
        margin: auto;
    }


    #signup_box{
        margin: auto;
        border-collapse: collapse;
    }
    tr td{
        font-size: 1.6vw;
        border: 1.5px solid white;
        width: 48vw;
        padding: 0.2vw
    }
    .category{
        width: 18.15vw;
        text-align: left;
    }
    .text_box{
        width: 5.49vw;
    }
    button{
        width: 8.65vw;
        height: 3.3vh;
        font-size: 0.89vw;
        background-color: transparent;
        border-radius: 5px;
    }
    input, select{
        border: 1px solid;
        height: 28px;
        background-color: transparent;
        font-size: 0.89vw;
        border-radius: 5px;
    }

    select{
        appearance: none;
        border-radius: 0px;
        width: 5.45vw;
        text-align-last:center;
        border-radius: 5px;
    }
    i{
        font-size: 1.32vw;
        font-style: normal;
        margin-left: 0.5vw;
        margin-right: 0.5vw;
    }
    input[type='radio']{
        font-size: 1.2vw;
        vertical-align: middle;
    }
    .answer{
        padding-left: 1vw;
        text-align: left;
    }
    .idCheckBtn{
        height: 28px;
        width: 9vw;
        margin-left: 2vw;
        font-size: 1vw;
    }
    .selectEmail{
        margin-left: 1vw;
        width: 7vw;
        height: 29px;
        font-size: 1vw;
    }
</style>