import {
    Vue,
    Component, Mixins,
    Emit, Model,
    Inject, Provide,
    Prop, Watch,
  } from 'vue-property-decorator';
  
@Component
export class FeatureMinix extends Vue{
    list:any[] = []
    totalPage:number = 0
    limit:number =  5
    page:number = 1
    loadMore(scroll:any):void {
        if(this.page<this.totalPage){
            this.page++
            this.getList(this.page)
        } else{
            scroll.forceUpdate();
        }
        
    }
    getList(list:any,page:number = 1,limit:number=this.limit){
        let data = {page,limit}
        list(data).then((res:any)=>{
        if(page == 1){
            this.list = res.data
            this.totalPage = res.total_page
        } else{
            this.list = this.list.concat(res.data)
        }
        
        })
    }
    
}