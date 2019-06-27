const listHelper = require('../utils/list_helper');

test('dummy returns 1', () => {
  const result = listHelper.dummy();
  expect(result).toBe(1);
});

describe('total likes', () => {
  const listOfBlogs = [
    {
      title: "String",
      author: "String",
      url: "String",
      likes: 2,
    },
    {
      title: "Kauraa",
      author: "Jeni",
      url: "String",
      likes: 7,
    },
    {
      title: "String",
      author: "String",
      url: "String",
      likes: 3,
    },
    
  ];
  
  test('total number of likes', () => {
    const result = listHelper.totalLikes(listOfBlogs);
    expect(result).toBe(12);
  });
});

describe('favourite blog', () => {
  const listOfBlogs = [
    {
      title: "String",
      author: "String",
      url: "String",
      likes: 2,
    },
    {
      title: "Kauraa",
      author: "Jeni",
      url: "String",
      likes: 7,
    },
    {
      title: "String",
      author: "String",
      url: "String",
      likes: 3,
    },
    
  ];

  test('blog with most likes, number of likes', () => {
    const result = listHelper.favouriteBlog(listOfBlogs).likes;
    expect(result).toBe(7);
  });

  test('right object', () => {
    const result = listHelper.favouriteBlog(listOfBlogs);
    expect(result).toEqual(
      {
        title: "Kauraa",
        author: "Jeni",
        url: "String",
        likes: 7,
      }
    );
  })
});

describe('blogger with most blogs', () => {
  const listOfBlogs = [
    {
      title: "String",
      author: "String",
      url: "String",
      likes: 2,
    },
    {
      title: "Kauraa",
      author: "Jeni",
      url: "String",
      likes: 7,
    },
    {
      title: "String",
      author: "String",
      url: "String",
      likes: 3,
    },    
  ];

  test('total number of blogs', () => {
    const result = listHelper.mostBlogs(listOfBlogs);
    expect(result).toEqual({
      author: "String",
      numOfBlogs: 2
    })
  });
});


describe('blogger with most likes', () => {
  const listOfBlogs = [
    {
      title: "String",
      author: "String",
      url: "String",
      likes: 2,
    },
    {
      title: "Kauraa",
      author: "Jeni",
      url: "String",
      likes: 1,
    },
    {
      title: "String",
      author: "String",
      url: "String",
      likes: 3,
    }    
  ];

  test('most likes', () => {
    const result = listHelper.mostLikes(listOfBlogs);
    expect(result).toEqual({ 
      author: "String",
      likes: 5
    });
  });
});