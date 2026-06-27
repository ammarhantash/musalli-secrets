INSERT OR IGNORE INTO jewelry_sets (id, name, description, occasion) VALUES
  ('set_alnur', 'Al Nur Bridal Set', 'A luminous bridal suite evoking the golden light of Mecca at dawn. Four pieces unified by geometric precision.', 'Bridal'),
  ('set_layla', 'Layla Evening Set', 'Sculptural evening pieces for the woman who commands a room. Fluid lines, bold presence.', 'Evening'),
  ('set_mecca', 'Mecca Heritage Set', 'Rooted in Islamic geometric tradition. Three pieces that carry centuries of craft into the present.', 'Heritage'),
  ('set_yawm',  'Yawm Everyday Set',  'Refined simplicity for daily wear. Lightweight, durable, and effortlessly elegant.', 'Everyday');

INSERT OR IGNORE INTO set_pieces (id, set_id, name, category, base_price_sar, sort_order) VALUES
  ('piece_alnur_1', 'set_alnur', 'Solitaire Engagement Ring', 'Ring',     18000, 0),
  ('piece_alnur_2', 'set_alnur', 'Diamond Wedding Band',      'Ring',      9500, 1),
  ('piece_alnur_3', 'set_alnur', 'Drop Pendant Necklace',     'Necklace', 14000, 2),
  ('piece_alnur_4', 'set_alnur', 'Stud Earrings',             'Earrings',  8500, 3),
  ('piece_layla_1', 'set_layla', 'Cocktail Ring',             'Ring',     12000, 0),
  ('piece_layla_2', 'set_layla', 'Collar Necklace',           'Necklace', 16500, 1),
  ('piece_layla_3', 'set_layla', 'Drop Chandelier Earrings',  'Earrings', 11000, 2),
  ('piece_mecca_1', 'set_mecca', 'Filigree Band Ring',        'Ring',      8500, 0),
  ('piece_mecca_2', 'set_mecca', 'Geometric Cuff',            'Bracelet', 13000, 1),
  ('piece_mecca_3', 'set_mecca', 'Crescent Necklace',         'Necklace', 11500, 2),
  ('piece_yawm_1',  'set_yawm',  'Stackable Ring',            'Ring',      5500, 0),
  ('piece_yawm_2',  'set_yawm',  'Delicate Chain Necklace',   'Necklace',  7000, 1),
  ('piece_yawm_3',  'set_yawm',  'Huggie Earrings',           'Earrings',  4800, 2);
