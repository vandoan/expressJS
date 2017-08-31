const express = require("express");
const router = express.Router();
const { data } = require('../data/flashcardData.json'); // data = json.data
const { cards } = data; // card = data.card


router.get("/", (req, res) => {
	const id = Math.floor(Math.random() * cards.length);

	return res.redirect(`/cards/${id}?side=question`); // use ` for js string interpolation
});

router.get("/:id", (req, res) => { // defaults to /cards/
	// res.locals.prompt = "Where is San Juan del Sur?";
	// side: question || answer
	const { side } = req.query;
	const { id } = req.params;
	const text = cards[id][side];
	const name = req.cookies.username;
	var { hint } = cards[id];

	if( !side ) {
		return res.redirect(`/cards/${id}?side=question`);
	} else if ( side !== "question" && side !== "answer"){
		return res.redirect(`/cards/${id}?side=question`);
	}
 
	if (side === "question") {
		var oppositeSide = "Answer";
		var oppositeSideUrl = "answer";
	} else {
		var oppositeSide = "Question";
		var oppositeSideUrl = "question";
		hint = "";
	}
	const templateData = { name, text, side, id, oppositeSide, oppositeSideUrl, hint };

	res.render("card", templateData);  // Color
});

module.exports = router;