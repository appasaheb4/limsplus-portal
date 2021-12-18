export const checkNotUndefined = (object: any) => {
  console.log({ object });
  for (var key in object) {
    if (object[key] !== undefined) return true;
  }
  return false;
};

export const calculateTimimg = d => {
  let months = 0, years = 0, days = 0, weeks = 0;
  while(d){
     if(d >= 365){
        years++;
        d -= 365;
     }else if(d >= 30){
        months++;
        d -= 30;
     }else if(d >= 7){
        weeks++;
        d -= 7;
     }else{
        days++;
        d--;
     }
  }
  return {
     years, months, weeks, days
  };
};