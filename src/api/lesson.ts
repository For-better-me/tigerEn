import Vue from 'vue'
import http, { RequestOptions } from '../util/myAxios'
export class LessonApi {
    public static hotLesson(data?: {}, params?: {}): Promise<any> {
        return http({
            url: 'Info/getList',
            method: 'post',
            data
        })
    }
    public static lessonList(data?: {}, params?: {}): Promise<any> {
        return http({
            url: 'Curriculum/getList',
            method: 'post',
            data
        })
    }
    public static lessonBrief(data?: {}, params?: {}): Promise<any> {
        return http({
            url: 'Curriculum/getWeek',
            method: 'post',
            data
        })
    }
    public static lessonInfo(type: number, params?: {}): Promise<any> {
        let url = ''
        switch (type) {
            case 1:
                url = 'Curriculum/getDaysInfo'//普通
                break;
            case 2:
                url = 'Audition/getInfo'
                break;
            case 3:
                url = 'user/myDaysCurriculum'
                break;
        }
        return http({
            url: url,
            method: 'get',
            params
        })
    }
    public static lessonRecord(data?: {}, params?: {}): Promise<any> {
        return http({
            url: 'Browse/getList',
            method: 'post',
            data
        })
    }
    public static lessonMy(data?: {}, params?: {}): Promise<any> {
        return http({
            url: 'user/myCurriculum',
            method: 'post',
            data
        })
    }
    //试听课程
    public static lessonTry(data?: {}, params?: {}): Promise<any> {
        return http({
            url: 'Audition/getList',
            method: 'post',
            data
        })
    }
}
