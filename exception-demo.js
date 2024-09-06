const express = require('express')
const app = express()

app.listen(1111)

// 배열에 json 여러개 담기
let mywishes = [
    {id : 1, name : 'hamburger'},
    { id : 2, name : 'pork' },
    { id : 3, name : 'beef' },
    { id : 4, name : 'fries'}
]

// 전체 조회 -- json 모양으로 생긴 배열 보내기 (주로 프론트엔드 쪽으로 보낼때 많이 사용!!)
app.get('/mywishes', function(req, res) {
    res.json(mywishes)
})

// 개별 조회
app.get('/mywishes/:id', function(req, res) {
    let {id} = req.params.id
    id = parseInt(id)
    var findMywishes = 
        mywishes.find(wish =>( wish.id == id))
        // mywishes 배열 안에 있는 객체 중, id 값이 params.id랑 같은 객체 찾기

    if(findMywishes) {
        res.json(findMywishes)
    } else { // 예외를 터트린다 = http status code 성공 => 실패로!
        res.status(404).send(
            "? id로 산 먹을것이 없습니다."
        )
    }

})
