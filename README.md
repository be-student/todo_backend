설명  
sql 사용. sequelize 사용  
tasks,hashtags 테이블이 존재하고 has many 관계로 n:M관계를 형성함.  
tasks는 id, title, description, createdAt, editedAt, targetDate, finishDate, clear로 구성되어 있고,  
hashtags 는 id, name, wordColor, backgroundColor, createdAt 으로 구성됨.  
N:M관계를 위한 taskhashtag 테이블이 있음. postId와, hashtagId를 이용해 서로를 연결함.

POST tasks/ : task생성
PUT tasks/:id : task 수정 완료 여부도 함께 수정, 수정일 업데이트
DELETE tasks/:id 특정 task 삭제
GET tasks/:id 특정 task조회
GET tasks/ 모든 task 조회
GET tasks/nearness 로 3일 남은 tasks 조회

GET hashtags/:name 으로 특정 tag에 있는 조회
Delete hashtags/:name 으로 특정 hashtag 삭제

json 형식으로 보내면 수정 또는 생성이 가능합니다.
{
"title":"new task",
"description":"new description #new #tag",
"clear":1,
"targetDate":"2022-02-11 23:59"
}
색깔은 9자리 숫자로 제공했습니다. 9자리 숫자중
1~3자리 R
4~6자리 G
7~9자리 B 입니다.
