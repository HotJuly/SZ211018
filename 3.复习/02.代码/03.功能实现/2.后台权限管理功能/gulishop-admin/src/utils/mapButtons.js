export default function mapButtons(buttons){
    const mapObj = {};
    buttons.forEach((item)=>{
        mapObj[item]=true;
    })
    return mapObj;
}