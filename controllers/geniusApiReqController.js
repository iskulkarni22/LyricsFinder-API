const asyncHandler = require('express-async-handler')

// @desc Get Genius Song through API request
// @route GET /api_key
// @access Private
const getGeniusSong = asyncHandler(async (req, res) => {
    const search_term = decodeURIComponent(req.headers.search_term)
    console.log(search_term)
    const api_key = process.env.GENIUS_API_KEY
    fetch(`https://api.genius.com/search?q=${search_term}&access_token=${api_key}`).then(r => r.json()).then(result => {
        const top_hit = result["response"]["hits"][0]?.result
        if (!top_hit) {
            return res.json({message: 'Song not found. Try changing your search terms.'})
        }
        const song_id = top_hit.id
        // console.log(song_id)

        const song_ftitle = top_hit.full_title
        const song_art = top_hit.song_art_image_url
        const song_artists = top_hit.primary_artist.name
        const song_title = top_hit.title

        return res.json({
            song_id: song_id,
            song_ftitle: song_ftitle,
            song_art: song_art,
            song_artists: song_artists,
            song_title: song_title
        })
    })
})

module.exports = { getGeniusSong }
