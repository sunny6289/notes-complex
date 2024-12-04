export const checkInequalTags = (arr1, arr2)=> {
    // Check if the arrays have the same length
    if (arr1.length !== arr2.length) {
        return true;
    }
    
    // Sort the arrays and compare each element
    const sortedArr1 = [...arr1].sort();
    const sortedArr2 = [...arr2].sort();
    
    const res = sortedArr1.every((ele, index) => ele.label === sortedArr2[index].label);
    // console.log(res);
    return !res;
}
