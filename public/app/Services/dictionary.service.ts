/**
 * Created by Hyeonmin on 2017-02-14.
 */

export class DictionaryService {

  toKor(eng: string): string {
    let result =  this.dictionary[eng];
    return result == undefined ? eng : result;
  }

  dictionary = {
    pohang: '포항',
    kyungju: '경주',
    yangdeokdong: '양덕동',
    jangseongdong: '장성동',
    korean: '한식',
    japanese: '일식',
    snack: '분식',
    fusion: '퓨전'
  };
}
