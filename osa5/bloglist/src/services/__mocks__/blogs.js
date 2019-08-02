const blogs = [
  {    
    title: "Testi-blogi",
    author: "Testi Authori",
    url: "/hashahs.fi/ksks",
    likes: 0,
    _id: "5d3894517fdf9a35e0864113",
    user: "5d3c5ab57fdf9a35e0864116"  
  },
  {    
    title: "Testi-blog2i",
    author: "Testi Authori2",
    url: "/hashahs.fi/ksks2",
    likes: 0,
    _id: "5d3894517fdf9a35e0864111",
    user: "5d3c5ab57fdf9a35e0864112"  
  }
]

const getAll = () => {
  return Promise.resolve(blogs);
}



const setToken = (newToken) => {
  const token = `bearer ${newToken}`;
}

export default { getAll, setToken };