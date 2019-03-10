
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('photos').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('photos').insert([
        {
          user_id: 1,
          location: 'tokyo',
          description: 'downtown tokyo from above',
          img_url: 'https://cdn.japantimes.2xx.jp/wp-content/uploads/2018/07/n-tokyo-a-20180715-870x580.jpg'
        },
        {
          user_id: 1,
          location: 'tokyo',
          description: 'shibuya crossing busy',
          img_url: 'https://www.japan-guide.com/g18/3007_01.jpg'
        },
        {
          user_id: 1,
          location: 'tokyo',
          description: 'tsukiji fish market',
          img_url: 'https://www.japan-guide.com/g18/3021_05.jpg'
        },
        {
          user_id: 2,
          location: 'tahoe',
          description: 'the lake in the summer',
          img_url: 'https://d3qvqlc701gzhm.cloudfront.net/full/8628b4debe5ba74e24b2207dc63abd14ad722640e6227e23c96a666905c28baf.jpg'
        },
        {
          user_id: 2,
          location: 'tahoe',
          description: 'snow covered mountain and lake in winter',
          img_url: 'https://d3qvqlc701gzhm.cloudfront.net/full/fa7dec47ec85af5062b56c8a779ac6948f0528a52e230fe6a2d4b2dc6199281b.jpg'
        },
        {
          user_id: 2,
          location: 'tahoe',
          description: 'top of a run on heavenly',
          img_url: 'http://cdn.mntm.me/31/69/f8/Heavenly_Valley-South_Lake_Tahoe-CA-3169f8d38edb4c55bd30e00fecd21979_c.jpg'
        }
      ]);
    });
};
