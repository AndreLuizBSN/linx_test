const Cache = use("App/Models/Cache")

class CacheService {

    async isExists( json ) {

        await this.clearCache();

        var data = await Cache
            .query()
            .where('json', json)
            //.findBy('json', json)
            .first();

        if (data) {
            return true;
        } else {
            const cache = new Cache()
            cache.json = json;
            await cache.save();
            return false;
        }

    }

    async clearCache() {

        var currentdate = new Date();
        currentdate.setMinutes( currentdate.getMinutes() - 10 )

        await Cache
            .query()
            .where('created_at', '<', currentdate)
            .delete()
    }
}

module.exports = CacheService