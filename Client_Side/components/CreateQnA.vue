<template>
	<div class="main">
        <div class="wrap">
			<table class="noticeTable">
                <tr><p>제목</p>
                    <td id="titleTable"><input type="text" id="title" placeholder="제목을 입력하세요." v-model="Title"/></td>
                </tr>
			</table>
            <textarea v-model="Contents" id="textarea"></textarea>
            <router-link to="qna" tag='button' class="Btns" @click.native="cancel">취소하기</router-link>
            <router-link v-if="getisRevise" to="qna" tag='button' class="Btns" @click.native="reviseContentsServer({ id : getSelectedBoard.id, Specification, Title, Contents, Writer: getUserId, isHidden})">수정하기</router-link>
            <router-link v-else to="qna" tag='button' class="Btns" @click.native="setContentsServer({  Specification, Title, Contents, Writer: getUserId, isHidden})">작성하기</router-link>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	data(){
		return {
			Specification:"1", 
			Title:"", 
			Contents:"", 
			Writer:"", 
			isHidden:"0",//체크박스 추가해서 수정 할 것.
		}
	},
	computed : {
		...mapGetters(['getUserId', 'getSelectedBoard', 'getisRevise']),
	},
	methods:{
		...mapActions(['setContentsServer', 'reviseContentsServer']),
		cancel(){
			this.$store.state.isRevise = false;
		}
	},
	created() {
		if(this.$store.state.isRevise == true){
			this.Title = this.getSelectedBoard.Title;
			this.Contents = this.getSelectedBoard.Contents;
		}
	}
}
</script>

<style scoped>
.main{
	margin: auto;
	display: table;
	min-height: 100vh;
	height: calc(100vh-89px);
	
}

.wrap{
	padding-top: 10.4vh;
	margin: auto;
}
.noticeTable{
	position: relative;
	border-collapse: collapse;
	margin: auto;
	width: 61vw;
	text-align: left;
	margin-bottom: 2.9vh;
}

td{
	font-size: 1.45vw;
	border: 0.3vh solid rgb(211,209,210);
	border-right: none;
	width: 100%;
	padding: 0.5vw
}
tr{
	border-bottom: 0.3vh solid rgb(211,209,210);
	border-top: 0.3vh solid rgb(211,209,210);
}
p{
	text-align: center;
	width:11.6vw;
	padding: 0.5vw;
    font-size: 2.5vw;
    vertical-align: middle;
}

.textarea{
	border: 0.15vh solid rgb(211,209,210);
}
#title{
    width: 100%;
    height: 2.5vw;
    font-size: 100%;
	background-color: transparent;
    border: 1px solid transparent;
	border-radius: 5px;
}
#textarea{
    border: 0.3vh solid rgb(211,209,210);
    font-size: 2.5vw;
    min-width: 100%;
    min-height: 60vh;
    background-color: transparent;
    resize: none;
}
.Btns{
    width: 17vw;
    height: 40px;
    background-color: rgb(118,112,112);
    color: white;
	border-radius: 5px;
    font-size: 1.5vw;
    margin: 20px;
}
</style>