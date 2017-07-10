import { productList as productListApi,webRoot } from '../assets/api.json';

function ajaxSuccess(res){
    if(res.code != 200){
         alert(res.message);
         return false;
    }
    //TODO
    console.log(res)
    return true;
}

function ajaxFail(xhr,text,errorThrow){
    let _xhr = JSON.stringify(xhr);
    //TODO
    const errorMsg = `xhr:${_xhr}\ntext:${text}\nerrorThrow:${errorThrow}`;
    console.log(errorMsg);
    return;
}

function getProductList (list){
            const productList = list.map(function (val, index) {
                return {
                    productId: val.product_id,
                    imgSrc: val.top_image_url,
                    title: val.title,
                    price: val.market_price
                }
            });
            this.setState({
                productList: productList
            })
        }
function productListByAjax(data){
            $.ajax({
                type:  _$$.env == "product" ? "post" : "get",
                url: _$$.env == "product" ? webRoot + productListApi.url : productListApi.mockUrl ,
                data: data,
                dataType: 'json'
            }).done((res) => {
                if (!ajaxSuccess(res)) return;
                getProductList.call(this, res.body.rows);
            }).fail((xhr, text, errorThrow) => {
                ajaxFail(xhr, text, errorThrow);
            });
}
const _$$ = {
    env:"product"
}
export {
    ajaxSuccess,
    ajaxFail,
    getProductList,
    productListByAjax,
    _$$
}