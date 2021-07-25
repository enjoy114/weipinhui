let username = localStorage.getItem('username')
$('.nav_top').children().eq(0).html(`你好,${username}`)

let product_arr = []
// 根据本地存储勾选已选择的商品
function getCheckout(product_arr) {
    let str_temp = localStorage.getItem('pids')
    let checked = str_temp.split(',').filter(s => !!s)
    product_arr.forEach((s, index) => {
        if (checked.includes(s.pid)) {
            console.log($('.checkoutbox'))
            $('.checkoutbox').eq(index).attr('checked', '')
        } else {
            $('.checkoutbox').eq(index).removeAttr('checked')
        }
    })
}

// 全部恢复不选中状态
function resumeCheckout(product_arr) {
    localStorage.setItem('old_check_num',0)
    localStorage.setItem('pids','')
    product_arr.forEach((s, index) => {
        $('.checkoutbox').eq(index).removeAttr('checked')
    })
}
loadlist()
function loadlist() {
    let id=localStorage.getItem('uid')
    console.log(id);
    if(id==null){
        alert('请登录')
        return
    }else{
    $.get('http://jx.xuzhixiang.top/ap/api/cart-list.php', {id},
        function (res) {
            product_arr = res.data
            let arr = res.data
            let html = ''
            for (let i = 0; i < arr.length; i++) {
                let obj = arr[i]
                html += `<tr>
                <td>
                    <input type="checkbox" name="" class="checkoutbox" id="check"onchange="checkFn(${obj.pid},this)">
                    <img src="${obj.pimg}" alt="" class="list_photo">
                    <span class="list_desc">${obj.pdesc}</span>
                </td>
                <td class="list_price">￥${obj.pprice}</td>
                <td class="list_num">
                    <button onclick="subFn(${obj.pid},this)">-</button>
                    <span class="list_pnum">${obj.pnum}</span>
                    <button onclick="addFn(${obj.pid},this)">+</button>
                </td>
                <td class="list_del" onclick="delFn(${obj.pid})">删除</td>
            </tr>`
            }
            $('.list_content').html(html)
            getCheckout(product_arr) //渲染订单结束后，把已选择的商品勾上
            countFn() //计算当前勾选商品的总价
            if (localStorage.getItem('pids')) {
                $('.djs').children().eq(1).attr('id', 'djs_start')
                $('.djs_minute').css('display', 'inline-block')
                $('.djs_second').css('display', 'inline-block')
                start()
            }
        })
    }
}

// 点击加号
function addFn(pid, btn) {
    let num = btn.previousElementSibling.innerHTML
    num = parseInt(num) + 1
    btn.previousElementSibling.innerHTML = num
    updateFn(pid, num)
    countFn()
}
// 点击减号
function subFn(pid, btn) {
    let num = btn.nextElementSibling.innerHTML
    num = num = parseInt(num) - 1
    btn.nextElementSibling.innerHTML = num
    updateFn(pid, num)
    countFn()
}
// 删除购物车商品
function delFn(pid) {
    $.get('http://jx.xuzhixiang.top/ap/api/cart-delete.php', {
        uid: localStorage.getItem('uid'),
        pid
    }, function (res) {
        let str_temp = localStorage.getItem('pids')
        str_temp = str_temp ? str_temp.replace(pid + ',', '') : ''
        localStorage.setItem('pids', str_temp) //本地存储删除当前商品
        loadlist()
        countFn()
        if(localStorage.getItem('pids')==''){
            $('.djs').children().eq(1).removeAttr('id')
            $('.djs_minute').css('display', 'none')
            $('.djs_second').css('display', 'none')
            $('.list_sum').html('0')
            $('.shopping_sum').html('￥0')
            $('.shopping_sum').html('￥0')
            localStorage.setItem('old_check_num', 0)
            clearInterval(window.timer)
            return
        }
    })
}
// 更新购物车数量
function updateFn(pid, num) {
    console.log(num);
    if (num < 1) {
        delFn(pid)
    } else {
        let uid = localStorage.getItem('uid')
        $.get('http://jx.xuzhixiang.top/ap/api/cart-update-num.php', {
            uid,
            pid,
            pnum: num
        }).then(res => {
            console.log(res);
            // countFn()
        })
    }
}
// 开启定时器
function start() {
    clearInterval(window.timer)
    window.timer = setInterval(function () {
        let now = new Date()
        let minu = Date.parse(localStorage.getItem('future')) - Date.parse(now)
        let s = parseInt(minu / 1000) % 60
        if (s < 10) {
            $('.djs_second').html("0" + s)
        } else {
            $('.djs_second').html(s)
        }
        let m = parseInt(minu / 1000 / 60) % 60
        if (m < 10) {
            $('.djs_minute').html("0" +m)
        } else {
            $('.djs_minute').html(m)
        }
        if (s <= 0 && m <= 0) {
            $('.djs').children().eq(1).removeAttr('id')
            $('.djs_minute').css('display', 'none')
            $('.djs_second').css('display', 'none')
            $('.list_sum').html('0')
            $('.shopping_sum').html('￥0')
            $('.shopping_sum').html('￥0')
            localStorage.setItem('old_check_num', 0)
            resumeCheckout(product_arr)
            clearInterval(window.timer)
        }
    }, 1000)
}
// 单选按钮
old_check_num = localStorage.getItem('old_check_num') ? localStorage.getItem('old_check_num') : 0 //这是原来选的个数，初始化为0
function checkFn(pid) {
    let add_checkout=false //新增待选商品
    // 勾选的时候，同步数据到本地存储
    let ids_str = localStorage.getItem('pids') ? localStorage.getItem('pids') : ''
    if (ids_str.includes(pid)) {
        ids_str = ids_str.replace(pid + ',', '')
        add_checkout=false
    } else {
        ids_str += pid + ','
        add_checkout=true
    }
    localStorage.setItem('pids', ids_str)

    let ipts = document.querySelectorAll('#check')
    let arr = [...ipts]
    let resArr = arr.filter(v => v.checked == true)
    // console.log('原来的选择数' + window.old_check_num)
    // console.log('现在的选择数' + resArr.length)
    if (!resArr.length) { //如果没选的情况下
        $('.djs').children().eq(1).removeAttr('id')
        $('.djs_minute').css('display', 'none')
        $('.djs_second').css('display', 'none')
        $('.list_sum').html('0')
        $('.shopping_sum').html('￥0')
        $('.shopping_sum').html('￥0')
        localStorage.setItem('old_check_num', 0)
        clearInterval(window.timer)
        return
    }

    //原来的个数大于现在的个数，说明你取消了某个单选框，不重置倒计时，return掉
    if (!add_checkout) {
        let old_check_num=localStorage.getItem('old_check_num')
        localStorage.setItem('old_check_num', old_check_num-1)
        countFn()
        return
    }
    $('.djs').children().eq(1).attr('id', 'djs_start')
    $('.djs_minute').css('display', 'inline-block')
    $('.djs_second').css('display', 'inline-block')
    // Date.parse(new Date()===Date.now()当前时间的时间戳
    // localStorage.setItem('future', new Date(Date.parse(new Date()) + 20 * 60 * 1000))
    localStorage.setItem('future', new Date(Date.now() + 20 * 60 * 1000))
    start()
    countFn()
    localStorage.setItem('old_check_num', resArr.length) //在上述执行完，把新的长度给old_check_num，它就变成下一次的老个数了
}
// console.log($('.djs').children().eq(1));
// 计算总价
function countFn() {
    let ipts = document.querySelectorAll('#check')
    let arr = [...ipts]
    let resArr = arr.filter(v => v.checked == true) //获得选中的按钮
    let sum = 0
    let sum_num = 0
    // console.log(resArr)
    resArr.forEach(v => {
        let tr = v.parentElement.parentElement
        let price = tr.querySelector('.list_price').innerHTML.split('￥')[1]
        let pnum = tr.querySelector('.list_pnum').innerHTML
        sum = (Number(sum) + price * pnum).toFixed(2)
        sum_num = parseInt(pnum) + sum_num
    })
    $('.list_sum').html(sum_num)
    $('.shopping_sum').html(`￥${sum}`)
}