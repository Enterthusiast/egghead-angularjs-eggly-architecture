angular.module('eggly.models.bookmarks', [])
    .service('BookmarksModel', function ($http, $q) {
        var model = this,
            URLS = {
                FETCH: 'data/bookmarks.json'
            },
            bookmarks;

        function extract(result) {
            return result.data;
        }

        function cacheBookmarks(result) {
            bookmarks = extract(result);
            return bookmarks;
        }

        function findBookmark(bookmarkId) {
            return _.find(bookmarks, function (bookmark) {
                return bookmark.id === parseInt(bookmarkId, 10);
            })
        }

        model.getBookmarks = function () {
            // return (bookmarks) ? $q.when(bookmarks) : $http.get(URLS.FETCH).then(cacheBookmarks);
            return (bookmarks) ? $q.when(bookmarks) : new Promise(function(resolve, reject) {
                resolve({ 
                    data: [
                        {"id":0, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development" },
                        {"id":1, "title": "Egghead.io", "url": "http://egghead.io", "category": "Development" },
                        {"id":2, "title": "A List Apart", "url": "http://alistapart.com/", "category": "Design" },
                        {"id":3, "title": "One Page Love", "url": "http://onepagelove.com/", "category": "Design" },
                        {"id":4, "title": "MobilityWOD", "url": "http://www.mobilitywod.com/", "category": "Exercise" },
                        {"id":5, "title": "Robb Wolf", "url": "http://robbwolf.com/", "category": "Exercise" },
                        {"id":6, "title": "Senor Gif", "url": "http://memebase.cheezburger.com/senorgif", "category": "Humor" },
                        {"id":7, "title": "Wimp", "url": "http://wimp.com", "category": "Humor" },
                        {"id":8, "title": "Dump", "url": "http://dump.com", "category": "Humor" }
                    ]
                });
            }).then(cacheBookmarks);
        };

        model.getBookmarkById = function (bookmarkId) {
            var deferred = $q.defer();
            if (bookmarks) {
                deferred.resolve(findBookmark(bookmarkId))
            } else {
                model.getBookmarks().then(function () {
                    deferred.resolve(findBookmark(bookmarkId))
                })
            }
            return deferred.promise;
        };

        model.createBookmark = function (bookmark) {
            bookmark.id = bookmarks.length;
            bookmarks.push(bookmark);
        };

        model.updateBookmark = function (bookmark) {
            var index = _.findIndex(bookmarks, function (b) {
                return b.id == bookmark.id
            });

            bookmarks[index] = bookmark;
        };

        model.deleteBookmark = function (bookmark) {
            _.remove(bookmarks, function (b) {
                return b.id == bookmark.id;
            });
        };
    })

;
