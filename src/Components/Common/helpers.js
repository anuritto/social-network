// функция для перебора массива объектов
export const filerMassivOfObjects = (massiv,propName,searchingValue,newProp)=>{
    return massiv.map(item=>{
        if(item[propName]==searchingValue) {
            return {...item, ...newProp}
        }
        else return item
    });
};