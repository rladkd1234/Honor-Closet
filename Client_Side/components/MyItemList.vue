<template>
    <div id="mylist">
        <div class="mainCompo">
            <table id="table">
                <tr class="tabletitle">
                    <td id="titlenum">번호</td>
                    <td></td>
                    <td id="titleitem">{{getTitleMyitem}}</td>
                    <td id="deletebtn">삭제</td>
                </tr>
                <tr class="itemLine" v-for="(item,index) in getMyItemList" :key="index">
                    <td id="itemnum"><!--{{item.num}}-->{{ index + 1 }}</td>
                    <td id="itemimg"><img :src="item.Thumbnail" class="Img"/></td>
                    <router-link to="/product/detail" tag="td" id="itemname" @click.native="setSelectedItem( item )">
                    {{item.Info}}
                    </router-link>
                    <td><span><i @click="removeitem({userId : getUserId, Itemid : item.id})" class="fas fa-trash-alt"></i></span></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
    data(){
        return{
            Items:[],
        }
    },
    computed : {
        ...mapGetters(['getMyItemList', 'getTitleMyitem', 'getUserId' ])
    },
    methods : {
        ...mapMutations(['setSelectedItem']),
        ...mapActions(['setUnCartListServer', 'setUnLikeListServer']),
        removeitem({userId, Itemid}){
            if(this.getTitleMyitem == "찜한 상품 내역"){
                //찜상품제거 logic
                this.setUnLikeListServer({userId,Itemid})
            } else if(this.getTitleMyitem == "장바구니 내역"){
                //장바구니상품제거 logic
                this.setUnCartListServer({userId,Itemid});
            }
        }
    },
    created(){
        //this.Items = this.getMyItemList;
    }
}
</script>

<style scoped>
    #mylist{
        min-height: 100vh;
        height: calc(100vh-89px);
        display: table;
        margin: auto;
    }

    .mainCompo{
        display: table-cell;
        vertical-align: middle;
    }
    #table{
        width: 74.4vw;
        border-collapse: collapse;
        border-bottom: 2px solid rgb(128, 128, 128);
    }
    .Img{
        width: 8.5vw;
        height: 8.5vw;
        display: table-cell;
        vertical-align: middle;
    }
    .tabletitle{
        font-size: 1.65vw;
        border-bottom: 2px solid rgb(128, 128, 128);
    }
    #titleitem{
        padding-left: 3.7vw;
        padding-bottom: 1.4vh;
    }
    #titlenum{
        padding-left: 0.8vw;
        padding-bottom: 1.4vh;
    }
    .itemLine{
        border-bottom: 1px solid rgb(211,209,210);
        height: 16.9vh;
        font-size: 1.4vw;
    }
    #itemnum{
        width: 6vw;
        padding-left: 1.5vw;
    }
    #itemname{
        padding-left: 6.6vw; 
    }
    #itemimg{
        width: 8.5vw;
        text-align: center;
    }
</style>