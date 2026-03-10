-- Inserção de usuario
INSERT INTO usuário (nome, email, senha, permissao) VALUES ('Admin Master', 'adminMaster@gmail.com', 'admin123', 3);
INSERT INTO usuário (nome, email, senha, permissao) VALUES ('Lucas Retanero', 'lucas@gmail.com', 'senha123', 2);
INSERT INTO usuário (nome, email, senha, permissao) VALUES ('Kevyn Cavalcanti', 'kevyn@gmail.com', 'senha123', 2);

-- Inserção de categorias
INSERT INTO categoria (nome, urlimagem) VALUES ('Minecraft', 'https://play-lh.googleusercontent.com/27O5tpaYE82W6m30rJ_MX3-UvshlDM6O8oXDxb6GseYW2T7P8UNT19727MGmz-0q3w');

INSERT INTO categoria (nome, urlimagem) VALUES ('Overwatch', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Overwatch_circle_logo.svg/2048px-Overwatch_circle_logo.svg.png');

INSERT INTO categoria (nome, urlimagem) VALUES ('Among Us', 'https://img.utdstc.com/icon/015/d1c/015d1cecf14c3ef529e92d788304fe58aa571c4e3ebaf4d78d5eea44f693c844:200');

INSERT INTO categoria (nome, urlimagem) VALUES ('Sea of Thieves', 'https://i.scdn.co/image/ab6761610000e5ebedda092170e6378c32a4a961');

INSERT INTO categoria (nome, urlimagem) VALUES ('Cuphead', 'https://img-eshop.cdn.nintendo.net/i/139836b3193bb50dab4982ac706d5d5d148fb7cc34ff3c6c21c34cdefa4f5df7.jpg');

INSERT INTO categoria (nome, urlimagem) VALUES ('R.E.P.O', 'https://cdn2.steamgriddb.com/icon/0504b3f1ca5994854e8718b2090ab098.ico');

INSERT INTO categoria (nome, urlimagem) VALUES ('Fnaf', 'https://i.redd.it/niatwi98l6t61.png');

INSERT INTO categoria (nome, urlimagem) VALUES ('Poppy Playtime', 'https://play-lh.googleusercontent.com/LmZuGeTmqAA3BTvSHvS7HSFOUfpajbknRhELZmoCHllZ27QZlhyPjD9urOrZwZAFM-A');

INSERT INTO categoria (nome, urlimagem) VALUES ('Sonic', 'https://cdn2.steamgriddb.com/icon/19b650660b253761af189682e03501dd.png');

INSERT INTO categoria (nome, urlimagem) VALUES ('Super Mario', 'https://media.gamestop.com/i/gamestop/20011358_ALT01/Super-Mario-Mario-and-Luigi-Circle-2-Pack-Canvas?$pdp$');

INSERT INTO categoria (nome, urlimagem) VALUES ('Outros', 'https://cdn-icons-png.flaticon.com/512/3082/3082048.png');

-- Inserção de brinquedos

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Funko POP! Tracer #550', 89.90, 'Overwatch', 'Boneco colecionável de vinil da linha Games Overwatch.', 'Figura estilizada com base inclusa e aproximadamente 10cm.', 'Funko', 'https://imgs.casasbahia.com.br/1568085601/1xg.jpg?imwidth=500');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('LEGO Minecraft: Expedição ao Deserto', 119.99, 'Minecraft', 'Conjunto de montar baseado no cenário desértico do jogo.', 'Contém 75 peças (Ref. 21251) e inclui mini-figura do Steve.', 'LEGO', 'https://superlegalbrinquedos.vtexassets.com/arquivos/ids/228379-800-auto?v=638429965434500000&width=800&height=auto&aspect=true');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Action Figure Among Us Vermelho', 42.99, 'Among Us', 'Figura de ação do personagem mais icônico do game.', 'Boneco articulado com 10cm de altura e acabamento premium.', 'Novabrink', 'https://rihappy.vtexassets.com/arquivos/ids/1996954-1200-auto?v=637699252718330000&width=1200&height=auto&aspect=true');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Funko POP! Mei #180', 119.90, 'Overwatch', 'Personagem Mei em estilo colecionável para fãs de games.', 'Boneco de vinil com embalagem original de visor transparente.', 'Funko', 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTc0ExQtl4NDNAOIUDkUmtJbQBpmvYX3LN_QHWCkqnTFmifydNWfN14qUa5kEoEcovDhdO4Iv2HBJGOPVocLvbvOqntN_dOHv8otOwo3VJcROO_E0fAbXjH');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Modelo Robótico R.E.P.O 3D', 65.00, 'R.E.P.O', 'Estátua decorativa baseada no jogo de terror R.E.P.O.', 'Figura fabricada em impressão 3D com material plástico resistente.', 'Mobokono', 'https://a-static.mlcdn.com.br/800x560/criancas-horror-r-e-p-o-robo-estatua-figura-brinquedo-repo-jogo-modelo-boneca-presente-figuras-de-mobokono/aliexpress/204060016/6ee12b81aad25c43936345e6bc3a2f7c.jpeg');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Boneco Steve Minecraft Mattel', 80.35, 'Minecraft', 'Figura de ação oficial para criar e explorar aventuras.', 'Mede 8cm de altura e acompanha acessórios temáticos do jogo.', 'Mattel', 'https://a-static.mlcdn.com.br/800x560/boneco-minecraft-mattel-com-acessorios-mattel/magazineluiza/238381100/3d69c268e146cbbd52e8efca20fd41db.jpg');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('LEGO Millennium Falcon Star Wars', 499.90, 'Outros', 'Réplica detalhada da nave mais famosa da saga Star Wars.', 'Conjunto complexo com mais de 1000 peças para montagem.', 'LEGO', 'https://www.anneclairebaby.com/cdn/shop/files/81lER2SxQeL._AC_SL1500.jpg?v=1731579199');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Picareta de Ouro Minecraft RPG', 235.10, 'Minecraft', 'Acessório de batalha em tamanho real para brincadeiras.', 'Item de RPG com 35cm de comprimento e design pixelado fiel.', 'Mattel', 'https://rihappy.vtexassets.com/arquivos/ids/8174077-1200-auto?v=638807913177070000&width=1200&height=auto&aspect=true');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Funko POP! Cassidy #904', 135.00, 'Overwatch', 'Figura do pistoleiro Cassidy de Overwatch 2.', 'Boneco de vinil colecionável com 11,3cm de altura total.', 'Funko', 'https://m.media-amazon.com/images/I/61zGnr6aHtL._AC_SX679_.jpg');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Ovelha Vermelha Caves & Cliffs', 139.98, 'Minecraft', 'Figura articulada de um dos animais clássicos do jogo.', 'Acompanha 2 blocos de papel e um acessório exclusivo.', 'Mattel', 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQKyer_PZWBbVuncK2E69xN2z-Z3YnZSrWwr-sLrMcFiNNoO7Y3KEE9WQ5Hj01otyUB20FV4SD90Bl-ZBCvRg0GtzbNlZMPRy_V-RsaNO8u-1csyqbtZ9K0');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Funko POP! Reaper #902', 139.50, 'Overwatch', 'Herói ofensivo sombrio em versão estilizada POP.', 'Figura de vinil resistente com aproximadamente 10cm.', 'Funko', 'https://m.media-amazon.com/images/I/71SAW342k8L._AC_SX679_.jpg');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Telefone Feliz Educativo', 29.90, 'Outros', 'Brinquedo de atividades motoras para primeira infância.', 'Modelo colorido com botões interativos e rodinhas funcionais.', 'Dican', 'https://images.tcdn.com.br/img/img_prod/841504/telefone_feliz_brinquedo_educativo_de_atividades_e_entretenimento_para_bebes_259113_1_0414dc8dfda38519d21c076011c53e27.jpg');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Funko POP! Genji #551', 179.90, 'Overwatch', 'Figura do herói Genji com design exclusivo em multicolor.', 'Mede 9,4cm de altura e vem em caixa para colecionador.', 'Funko', 'https://m.media-amazon.com/images/I/71Y2y6l+iUL._AC_SX679_.jpg');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Boneco Creeper Minecraft 25cm', 199.99, 'Minecraft', 'Figura inspirada no filme oficial de Minecraft (2025).', 'Estatueta com partes móveis e detalhes premium (JFR69).', 'Mattel', 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRwGgcPGpr0Wmld2X-q9PFxd3OB_stzBq_dUWfLQbtRaDJDJ1orWbNGaYYDL6j8KSJG5rPdrVZ6WZk4aW1zoTuNsFrfLXge8UUC4GUQSAjSkbYsNj1DhLmw');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Pelúcia Spike Brawl Stars', 89.99, 'Outros', 'Brinquedo de pelúcia macio do personagem lendário Spike.', 'Mede 25cm de altura e possui toque aveludado de alta qualidade.', 'Supercell', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5VmGC1ScLDbaRZ173i41CS7Pmo28wyuFMJ2ZqBseVo2ignj6J5JDsnWyxJ34706rEvDk&usqp=CAU');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Pelúcia Golden Freddy FNAF', 79.99, 'Fnaf', 'Boneco de pelúcia colecionável Five Nights at Freddys.', 'Mede 10cm e emite som de buzina ao apertar o nariz.', 'Fazbear Ent.', 'https://img.joomcdn.net/81c74d58279c54a9733c0d40511d2213318df6d2_1024_1024.jpeg');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Pelúcia Huntress Dead by Daylight', 69.99, 'Outros', 'Versão fofa da assassina Rabbit do universo DBD.', 'Edição especial de Halloween com 10cm e acabamento têxtil.', 'Behavior Toys', 'https://www.picclickimg.com/ojsAAOSw4nNnEI1N/Huntress-Plush-Dead-by-Daylight-DBD-SEGA-Rabbit.webp');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Figura Knight Hollow Knight', 109.90, 'Outros', 'Figura do protagonista do aclamado jogo indie.', 'Acabamento estilizado com alta durabilidade e detalhes.', 'Team Cherry', 'https://http2.mlstatic.com/D_NQ_NP_990544-CBT72346245094_102023-O.webp');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Pelúcia Huggy Wuggy Poppy Playtime', 89.90, 'Poppy Playtime', 'Boneco de pelúcia do icônico monstro azul de terror.', 'Design fiel ao jogo, com braços longos e costuras reforçadas.', 'Mob Ent.', 'https://guejutoys.com.br/cdn/shop/products/Sf6df21c0763f4a5a8b16ae396e343b36d.jpg?v=1649726604');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Boneco Chomper Plants vs Zombies', 94.90, 'Outros', 'Figura da planta carnívora roxa contra os zumbis.', 'Visual vibrante fiel à franquia, ideal para decoração.', 'PopCap Games', 'https://gw.alicdn.com/imgextra/i3/3417880949/O1CN01VxH3nI1IsgPausYLy_!!3417880949.jpg');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Figura Peely Banana Fortnite', 112.50, 'Outros', 'Boneco do personagem em forma de banana do Fortnite.', 'Figura articulada com cores vivas e material em vinil.', 'Epic Games', 'https://images.tcdn.com.br/img/img_prod/664029/mcfarlane_fortnite_solo_mode_core_peely_yellow_5161_1_104ad17a1733159c662f1a31352f5511_20220606150141.jpg');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Boneco Cuphead Retrô Vinil', 109.90, 'Cuphead', 'Personagem inspirado na estética dos desenhos de 1930.', 'Figura estilizada de vinil com acabamento fosco e base firme.', 'Studio MDHR', 'https://m.media-amazon.com/images/I/51yzNqKdAzL._AC_UF894,1000_QL80_.jpg');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Shadow the Hedgehog com Moto', 4599.99, 'Sonic', 'Figura articulada premium de Shadow na sua clássica moto.', 'Edição de luxo para colecionadores com acessórios detalhados.', 'SEGA', 'https://m.media-amazon.com/images/I/71-mD8yX1CL.jpg');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Boneco Yoshi Super Mario Nintendo', 97.90, 'Super Mario', 'O dinossauro companheiro do Mario em cores alegres.', 'Figura colecionável articulada com pintura de alta fidelidade.', 'Nintendo', 'https://supertoysandhobbies.com.au/cdn/shop/files/192995413993_1.jpg?v=1716196528');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Youtooz Megalodon Sea of Thieves', 727.86, 'Sea of Thieves', 'Tubarão lendário Megalodon em versão colecionável.', 'Mede 3.2 polegadas e faz parte da coleção oficial Youtooz.', 'Youtooz', 'https://m.media-amazon.com/images/I/611I3xb9HGL._AC_SX466_.jpg');