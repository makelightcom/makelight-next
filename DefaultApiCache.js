"use strict";

function DefaultApiCache(limit) {
    if (limit === void 0) { limit = 1000; }
    this.lru = lru_1.MakeLRUCache(limit);
}
DefaultApiCache.prototype.isExpired = function (key) {
    var value = this.lru.get(key, false);
    if (value) {
        return value.expiredIn !== 0 && value.expiredIn < Date.now();
    }
    else {
        return false;
    }
};
DefaultApiCache.prototype.get = function (key, cb) {
    var value = this.lru.get(key, false);
    if (value && !this.isExpired(key)) {
        cb(null, value.data);
    }
    else {
        cb && cb(null);
    }
};
DefaultApiCache.prototype.set = function (key, value, ttl, cb) {
    this.lru.remove(key);
    this.lru.put(key, {
        data: value,
        expiredIn: ttl ? (Date.now() + (ttl * 1000)) : 0
    });
    cb && cb(null);
};
DefaultApiCache.prototype.remove = function (key, cb) {
    this.lru.remove(key);
    cb && cb(null);
};
DefaultApiCache.prototype.clear = function (cb) {
    this.lru.removeAll();
    cb && cb(null);
};
module.exports = DefaultApiCache;


