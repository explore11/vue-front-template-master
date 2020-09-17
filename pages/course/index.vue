<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>

            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li><a title="全部" href="#">全部</a></li>
                <li v-for="(oneSubject,index) in subjectNestedList" :key="index" :class="{active:oneIndex===index}">
                  <a :title="oneSubject.title" href="#"
                     @click="subjectOne(oneSubject.id,index)">{{oneSubject.title}}
                  </a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li v-for="(twoSubject,index) in subSubjectList" :key="index" :class="{active:twoIndex===index}">
                  <a :title="twoSubject.title" href="#"
                     @click="subjectTwo(twoSubject.id,index)">{{twoSubject.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{'current bg-orange':buyCountSort!=''}">
                <a title="销量" href="javascript:void(0);" @click="searchBuyCount()">销量 <span
                  :class="{hide:buyCountSort==''}">↓</span> </a>
              </li>
              <li :class="{'current bg-orange':gmtCreateSort!=''}">
                <a title="最新" href="javascript:void(0);" @click="searchGmtCreate()">最新 <span
                  :class="{hide:gmtCreateSort==''}">↓</span> </a>
              </li>
              <li :class="{'current bg-orange':priceSort!=''}">
                <a title="价格" href="javascript:void(0);" @click="searchPrice()">价格&nbsp; <span
                  :class="{hide:priceSort==''}">↓</span> </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.length===0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span
              class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list" v-else>
            <ul class="of" id="bna">
              <li v-for="course in data.items" :key="course.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="course.cover" class="img-responsive" :alt="course.title">
                    <div class="cc-mask">
                      <a :href="'/course/'+course.id" title="开始学习"
                         class="comm-btn c-btn-1">开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/'+course.id" :title="course.title"
                       class="course-title fsize18 c-333">{{course.title}}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green" v-if="Number(course.price) === 0">
                      <i class="c-fff fsize12 f-fA">免费</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">9634人学习</i> |
                      <i class="c-999 f-fA">9634评论</i>
                  </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a :class="{undisable: !data.hasPrevious}"
               href="#" title="首页" @click.prevent="gotoPage(1)">
              首
            </a>
            <a :class="{undisable: !data.hasPrevious}"
               href="#" title="前一页" @click.prevent="gotoPage(data.current-1)">&lt;
            </a>
            <a v-for="page in data.pages" :key="page"
               :class="{current: data.current == page, undisable: data.current == page}"
               :title="'第'+page+'页'"
               href="#" @click.prevent="gotoPage(page)">
              {{ page }}
            </a>
            <a :class="{undisable: !data.hasNext}" href="#" title="后一页"
               @click.prevent="gotoPage(data.current+1)">>
            </a>
            <a :class="{undisable: !data.hasNext}" href="#" title="末页"
               @click.prevent="gotoPage(data.pages)">
              末
            </a>
            <div class="clear"/>
          </div>
        </div>

        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
  import course from '@/api/course'

  export default {
    data() {
      return {
        page: 1,
        data: {},
        subjectNestedList: [], // 一级分类列表11
        subSubjectList: [], // 二级分类列表12
        searchObj: {}, // 查询表单对象13
        oneIndex: -1,
        twoIndex: -1,
        buyCountSort: "",
        gmtCreateSort: "",
        priceSort: ""
      }
    },
    created() {
      // 查询课程列表
      this.getCourseList()
      // 查询所有的一级分类
      this.getOneSubjectList()
    },
    methods: {
      // 查询课程列表
      getCourseList() {
        course.getPageListByFront(1, 8, this.searchObj).then(
          response => {
            this.data = response.data.data
          }
        )
      },
      // 查询所有的一级分类
      getOneSubjectList() {
        course.getAllSubject().then(
          response => {
            this.subjectNestedList = response.data.data.list
          })
      },
      gotoPage(page) {
        if (this.data.pages < page) {
          page = this.data.pages
        }
        course.getPageListByFront(page, 8, this.searchObj).then(
          response => {
            this.data = response.data.data
          }
        )
      },
      subjectOne(oneSubjectId, index) {
        // 显示样式
        this.oneIndex = index

        this.twoIndex = -1
        this.subSubjectList = []
        this.searchObj.subjectId = "";
        this.searchObj.subjectParentId = oneSubjectId;

        for (let i = 0; i < this.subjectNestedList.length; i++) {
          let oneSubject = this.subjectNestedList[i]
          if (oneSubject.id === oneSubjectId) {
            // 获取二级分类
            this.subSubjectList = oneSubject.children
          }
        }
        // 分页查询
        this.gotoPage(this.page)
      },

      subjectTwo(twoSubjectId, index) {
        this.twoIndex = index
        this.searchObj.subjectId = twoSubjectId;
        this.gotoPage(this.page)
      },

      //购买量查询
      searchBuyCount() {
        this.buyCountSort = "1";
        this.gmtCreateSort = "";
        this.priceSort = "";
        this.searchObj.buyCountSort = this.buyCountSort;
        this.searchObj.gmtCreateSort = this.gmtCreateSort;
        this.searchObj.priceSort = this.priceSort;
        this.gotoPage(this.page)
      },
      //更新时间查询
      searchGmtCreate() {
        this.buyCountSort = "";
        this.gmtCreateSort = "1";
        this.priceSort = "";
        this.searchObj.buyCountSort = this.buyCountSort;
        this.searchObj.gmtCreateSort = this.gmtCreateSort;
        this.searchObj.priceSort = this.priceSort;
        this.gotoPage(this.page)
      },
      //价格查询
      searchPrice() {
        this.buyCountSort = "";
        this.gmtCreateSort = "";
        this.priceSort = "1";
        this.searchObj.buyCountSort = this.buyCountSort;
        this.searchObj.gmtCreateSort = this.gmtCreateSort;
        this.searchObj.priceSort = this.priceSort;
        this.gotoPage(this.page)
      }
    }
  }
  ;
</script>
<style scoped>
  .active {
    background: #bdbdbd;
  }

  .hide {
    display: none;
  }

  .show {
    display: block;
  }
</style>
