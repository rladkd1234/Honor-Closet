<template>
    <div class='main'>
        <div class="wrap">
            <table class="noticeTable">
                <thead class="table">
                    <tr class="tableTitle">
                        <td>번호</td>
                        <td>제목</td>
                        <td>작성자</td>
                        <td>작성일</td>
                        <td>조회수</td>
                    </tr>
                </thead>
                <tr class="noticelist" v-for="(notice, index) in this.getNotice" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td @click="setSelectedBoard({ give : notice})">
                        <router-link to="/bulletin" id="noticeTitle">
                            {{notice.Title}}
                        </router-link>
                    </td>
                    <td>{{notice.Writer}}</td>
                    <td>{{parsingData(notice.createdAt)}}</td><td>{{notice.Hit}}</td>
                </tr>
            </table>
            <div class="search_line">
                <input type="text" class="search_box">
                <button class="searchBtn">검색</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
    computed : {
        ...mapGetters(['getNotice'])
    },
    methods: {
        ...mapMutations(['setSelectedBoard']),
        ...mapActions(['getNoticeServer']),
        parsingData(str){
            str +="";
            return str.substring(0,10);
        }
    },
    created() {
        this.getNoticeServer();
    }
}
</script>

<style scoped>
    button{
        border-radius: 5px;
    }
    a {
        text-decoration: none;
        color: black;
    }
    .main{
        margin: auto;
        display: table;
        min-height: 100vh;
        height: calc(100vh-89px);
    }
    .wrap{
        display: table-cell;
        vertical-align: middle;
        margin: auto;
    }
    .noticeTable{
        position: relative;
        border-collapse: collapse;
        margin: auto;
        width: 76vw;
        text-align: center;
        border-bottom: 2px solid rgb(128,128,128);
    }
    .table{
        font-size: 1.6vw;
        background-color: transparent;
    }
    .tableTitle{
        border-bottom: 2px solid rgb(128,128,128);
    }
    .noticelist{
        height: 5.5vh;
        font-size: 1.45vw;
        border-bottom: 1px solid rgb(128,128,128);
    }
    .search_line{
        position: relative;
        margin: auto;
        text-align: center;
        display: table;
        margin-top: 13vh;
    }
    .search_box{
        display: table-cell;
        vertical-align: middle;
        border: 1px solid black;
        background-color: transparent;
        width: 25.4vw;
        height: 5.7vh;
        font-size: 100%;
        margin-right: 1.15vw;
        border-radius: 5px;
    }

    .searchBtn{
        display: table-cell;
        vertical-align: middle;
        background-color: rgb(118,112,112);
        color: white;
        font-size: 1.45vw;
        width: 13.7vw;
        height: 5.7vh;
    }
    #noticeTitle{
        cursor: pointer;
    }
</style>