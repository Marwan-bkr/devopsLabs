'use strict';

const express = require('express');

const PORT = 8080;

const app = express();
app.get('/', (req, res) => {
  res.send('⠀͎̩ͥ̍HẸ̣̩ͥ̇̍L̩̩̇̍Ḷ̣̣̩ͥ̇Ọ̩̩ͥͥ̍ WỌ̩̩ͥͥ̍rL̩̩̇̍d frỌ̩̩ͥͥ̍m DỌ̩̩ͥͥ̍ckẸ̣̩ͥ̇̍r⠀͎̩ͥ̍');
});

app.listen(PORT);
console.log(`Running on http://localhost:${PORT}`);
