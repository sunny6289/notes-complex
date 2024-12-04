const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
export const getDate = ()=>{
    const date = new Date();
    const creationDate = date.getDate().toString()+' '+months[date.getMonth()]+' '+date.getFullYear().toString();
    return creationDate;
}

