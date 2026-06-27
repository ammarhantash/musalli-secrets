const BASE = 'https://images.unsplash.com/photo';

function u(id, w = 800) {
  return `${BASE}-${id}?auto=format&fit=crop&w=${w}&q=80`;
}

export const SET_IMAGES = {
  Bridal:   u('1722410180670-b6d5a2e704fa'),
  Evening:  u('1641290748359-1d944fc8359a'),
  Heritage: u('1697713465161-d872b22723a2'),
  Everyday: u('1598560917807-1bae44bd2be8'),
};

export const PIECE_IMAGES = {
  Ring:     u('1605100804763-247f67b3557e', 400),
  Necklace: u('1722410180670-b6d5a2e704fa', 400),
  Bracelet: u('1697713465161-d872b22723a2', 400),
  Earrings: u('1641290748359-1d944fc8359a', 400),
};

export const OCCASION_SYMBOL = {
  Bridal: '◈', Evening: '◇', Heritage: '◉', Everyday: '◎',
};
