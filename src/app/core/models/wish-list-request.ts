export class WishListRequest{
    idProduct!:number;
    userName!:string;

    constructor(idProduct:number, userName:string){
        this.idProduct = idProduct;
        this.userName = userName;
    }
}