function check(a, selection, target){
  let sum = 0;
  for(let i=0;i<a.length;i++)
  {
    if(((selection>>i) & 1) == 1)
      sum += a[i];
  }
  return sum==target;
}

function exclude(a, selection) {
  let res = [a.length];
  let j = 0;
  for(let i=0;i<a.length;i++)
  {
    if(((selection>>i) & 1) == 0)
      res[j++] = a[i];
  }
  return res
}

function makeCurry(a) {
  let sum = a.reduce((accumulator, currentValue) => accumulator + currentValue);
  if(sum%3 > 0)
    return "noLuck";
  let target = sum/3;
  let max1 = 1<<a.length;
  for(let i=0;i<max1;i++)
  {
    if(check(a, i, target))
    {
      let b = exclude(a, i);
      let max2 = 1<<b.length;
      for(let j=0;j<max2;j++)
      {
        if(check(b, j, target))
          return formatSolution(i, j, a.length);
      }
    }
  }
  return "noLuck";
}

function formatSolution(p, q, len)
{   
  let res = new Array(len)
  res.fill('R')
  let j = 0;
  for(let i=0;i<len;i++)
  {
    if(((p>>i) & 1) == 1)
      res[i] = 'P';
    else
    {
      if(((q>>j) & 1) == 1)
        res[i] = 'Q';
      j++;
    }
  }
  return new String(res);
}


let a = [5, 4, 3, 3, 3, 3, 3, 3]
makeCurry(a)
