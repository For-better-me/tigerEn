import {
    Vue,
    Component, Mixins,
    Emit, Model,
    Inject, Provide,
    Prop, Watch,
  } from 'vue-property-decorator';
  
  import {LessonApi} from '@/api/lesson'
  import {SongApi,CartoonApi,PictureApi} from '@/api/feature'
  @Component
  export class FeatureMinix extends Vue{
    list:any[] = []
    totalPage:number = 0
    limit:number =  10
    page:number = 1
    api:any
    loadMore(scroll:any,api:any):void {
        this.page = this.page+1;
        if(this.page<=this.totalPage){
            this.getList(this.api,this.page)
        } else{
            scroll.forceUpdate();
        }
        
    }
    getList(api:any,page:number = 1,limit:number=this.limit){
        this.api = api
        let data = {page,limit}
        api(data).then((res:any)=>{
            if(page == 1){
                this.list = res.data
                this.totalPage = res.total_page
            } else{
                this.list = this.list.concat(res.data)

            }
        
        })
    }
   
   
    
}
