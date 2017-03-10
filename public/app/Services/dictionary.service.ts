/**
 * Created by Hyeonmin on 2017-02-14.
 */

export class DictionaryService {

  regionKor(eng: string): string {
    let result =  this.region[eng];
    return result == undefined ? eng : result;
  }

  dongKor(eng: string): string {
    let result =  this.dong[eng];
    return result == undefined ? eng : result;
  }

  delCatKor(eng: string): string {
    let result =  this.delCategory[eng];
    return result == undefined ? eng : result;
  }

  resCatKor(eng: string): string {
    let result =  this.resCategory[eng];
    return result == undefined ? eng : result;
  }

  region = {
    pohang: '포항',
    kyungju: '경주',
  };

  dong = {
    daedodong: '대도동',
    daeheungdong: '대흥동',
    deoksandong: '덕산동',
    duhodong: '두호동',
    hwanhodong: '환호동',
    jangseongdong: '장성동',
    jukdodong: '죽도동',
    uhyeondong: '우현동',
    yangdeokdong: '양덕동',
  };

  delCategory = {
    korean: '한식',
    chinese: '중식',
    japanese: '일식',
    snack: '분식',
    fusion: '퓨전',
    fastfood: '패스트푸드',
    others: '기타',
  };

  resCategory = {
    korean: '한식',
    chinese: '중식',
    japanese: '일식',
    western: '양식',
    world: '세계',
    snack: '분식',
    fusion: '퓨전',
    meat: '고기',
    fastfood: '패스트푸드',
    others: '기타',
    bakery: '베이커리',
    cafe: '카페'
  }
}
