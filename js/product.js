// 显示商品
listLoad()
function listLoad() {
    console.log(localStorage.getItem('uid'));
    axios.get('http://jx.xuzhixiang.top/ap/api/productlist.php', {
        params: { uid: localStorage.getItem('uid') }
    }).then((res) => {
        console.log(res.data.data);
        arr = res.data.data
        let html = ''
        arr.forEach(obj => {
            html += `
            <li>
                <a href="item.html?pid=${obj.pid}">
                    <dl>
                        <img src="${obj.pimg}" alt="">
                        <dt>
                            <p>折后价￥<span>${obj.pprice}</span></p>
                            <p>${obj.pname}</p>
                            <p>${obj.pdesc}</p>
                        </dt>
                        <dd><input type="button" value="立即抢购"></dd>
                    </dl>
                </a>
             </li>
             `
        });
        console.log(html);
        // $('.product_list').html(html)
        let ul = document.querySelector('.product_list')
        ul.innerHTML = html
    })
}


// 固定定位
var trigger_once = false
$(window).scroll(() => {
    let scrollTop = $(this).scrollTop()
    if (scrollTop >= 1344) {
        if (!trigger_once) {//为啥带个！
            trigger_once = true
            $('.profuct_list_top').css('position', 'fixed')
            $('.profuct_list_top').css('top', '-50px')
            let num = -50
            var timer = setInterval(() => {
                num += 1
                $('.profuct_list_top').css('top', num + 'px')
                if (num == 0) {
                    clearInterval(timer)
                }
            }, 10)
            $('.oproduct_list_top').css('display', 'block')
        }
    } else {
        trigger_once = false
        $('.oproduct_list_top').css('display', 'none')
        $('.profuct_list_top').css('position', 'inherit')
    }
})

