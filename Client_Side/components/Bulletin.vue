<template>
	<div class="main">
        <div class="wrap">
			<table class="noticeTable">
				<thead class="table">	
					<th class="tableTitle">
						<!--<tr>번호-->
							<!-- <td>{{board.id}}</td> --
							<td>{{ getSelectedBoard.No}}</td>
						</tr>-->
						<tr><p>제목</p>
							<td>{{ getSelectedBoard.Title }}</td>
						</tr>
						<tr><p>작성자</p>
							<td>{{ getSelectedBoard.Writer }}</td>
						</tr>
						<tr><p>작성일</p>
							<td>{{ parsingData(getSelectedBoard.createdAt) }}</td>
						</tr>
						<tr><p>조회수</p>
							<td>{{ getSelectedBoard.Hit }}</td>
						</tr>
					</th>
				</thead>
			</table>
			<viewer class="textarea"
			:value="getSelectedBoard.Contents"
			height="500px"
			/>
			
            <router-link to="/createqna" tag='button' class="Btns" @click.native="gotoRevise">수정하기</router-link>
            <router-link to="qna" tag='button' class="Btns" @click.native="delContentsServer({id:getSelectedBoard.id})">삭제하기</router-link>
		</div>
	</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import 'tui-editor/dist/tui-editor-contents.css';
import 'highlight.js/styles/github.css';
import Viewer from '@toast-ui/vue-editor/src/Viewer.vue'

export default {
	components: {
        Viewer
    },
	computed : {
		...mapGetters(['getSelectedBoard'])
	},
	methods : {
        parsingData(str){
            str +="";
            return str.substring(0,10);
		},
		...mapActions(['delContentsServer', 'reviseContentsServer']),
		gotoRevise(){
			this.$store.state.isRevise = true;
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

.table{
	font-size: 1.45vw;
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
	padding: 0.5vw
}

.textarea{
	border: 0.15vh solid rgb(211,209,210);
}
.Btns{
    width: 17vw;
    height: 40px;
    background-color: rgb(118,112,112);
    color: white;
    font-size: 1.5vw;
    margin: 20px;
	border-radius: 5px;
}
</style>