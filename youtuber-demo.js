// express 모듈 셋팅
const express = require('express')
const app = express()

app.listen(1234)

// 데이터 셋팅
let youtuber1 = {
    channelTitle : "십오야",
    sub : "593만명",
    videoNum : "993개"
}

let youtuber2 = {
    channelTitle : "침착맨",
    sub : "227만명",
    videoNum : "6.6천개"
}

let youtuber3 = {
    channelTitle : "TEO",
    sub : "54.8만명",
    videoNum : "726개"
}

let db = new Map()
let idx = 1
let msg

db.set(idx++, youtuber1)
db.set(idx++, youtuber2)
db.set(idx++, youtuber3)

// REST API 설계
// 전체 조회
app.get("/youtubers", function(req, res) {    

    if (db.size > 0) {
        let youtubs = Array.from(db.values())
        res.json(youtubs)
    
        /** 위와 같은 코드, forEach를 사용한 map 활용 */
        // let youtubers = {}
        // db.forEach(function(value, key){
        //     youtubers[key] = value
        // });
    
        // res.json(youtubers)
    } else {
        res.status(404).send(
            "?? 조회 가능한 유튜버가 없어유"
        )
    }

})


// 개별 조회
app.get('/youtubers/:id', function(req, res){    
    let {id} = req.params
    id = parseInt(id)
    
    const youtuber = db.get(id)

    if (youtuber) {
        res.json(youtuber)
    } else {
        msg ="유튜버 정보를 다시 확인해 주세요."
        res.status(404).json(msg)
    }
})


// 유튜버 정보 등록
app.use(express.json()) // http 외 모듈인 '미들웨어':json 설정
app.post('/youtubers', function(req, res) {
    let youtubers = {}

    if (req.body.channelTitle) {
        // 등록 = db에 저장 = Map(db)에 set
        db.set(idx++, req.body)

        msg = `${db.get(idx-1).channelTitle}님 응원합니다~!`
        res.status(201).json(msg)
    // } else if (req.body.channelTitle == db.forEach(function (value, key) {
    //     youtubers[key] = value
    // })) {
    //     res.status(400).send(
    //         "channelTitle 겹침"
    //     )
    // } else {
        res.status(400).send(
            "channelTitle이 없어용~~"
        )
    }




})

// delete 개별 유튜버
app.delete('/youtubers/:id', function(req, res) {
    let {id} = req.params
    id = parseInt(id)

    let youtuber = db.get(id)
    if (youtuber) {
        let name = youtuber.channelTitle

        db.delete(id)
        msg = `${name}님, 아쉽지만 빠이`

    } else {
        msg = `${id} 없어유`
        res.status(404).json(msg)
    }
})

app.delete('/youtubers', function(req, res) {
    // db 값 >= 1 : 전체 삭제, 없으면 이미 삭제했다고 하기
    if (db.size >= 1) {
        db.clear()

        msg = "빠이~"
        res.json(msg)
    } else {
        msg = "? 이미 없음"
        res.status(404).json(msg)

    }

})

app.put('/youtubers/:id', function(req, res) {
    let {id} = req.params
    id = parseInt(id)
    
    let youtuber = db.get(id)
    const oldTitle = youtuber.channelTitle

    if (youtuber == undefined) {
        msg =`${id}유튜버 정보를 다시 확인해 주세요.`
        res.status(404).json(msg)
    } else {
        let newTitle = req.body.channelTitle

        youtuber.channelTitle = newTitle
        db.set(id, youtuber)
        res.json({
            message : `${oldTitle} -> ${newTitle} 수정 완.`
        })
    }
})


/**
 * 기존 유튜버 코드
 * 
 * // express 모듈 셋팅
const express = require('express')
const app = express()

app.listen(1234)

// 데이터 셋팅
let youtuber1 = {
    channelTitle : "십오야",
    sub : "593만명",
    videoNum : "993개"
}

let youtuber2 = {
    channelTitle : "침착맨",
    sub : "227만명",
    videoNum : "6.6천개"
}

let youtuber3 = {
    channelTitle : "TEO",
    sub : "54.8만명",
    videoNum : "726개"
}

let db = new Map()
db.set(1, youtuber1)
db.set(2, youtuber2)
db.set(3, youtuber3)

// REST API 설계
app.get('/youtuber/:id', function(req, res){    
    let {id} = req.params
    id = parseInt(id)
    
    const youtuber = db.get(id)

    if (youtuber == undefined) {
        res.json({
            message : "유튜버 정보를 찾을 수 없습니다."
        })
    } else {


        res.json(youtuber)
    }
})
 */