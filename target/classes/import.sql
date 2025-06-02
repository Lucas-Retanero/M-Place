-- Inserção de usuário
INSERT INTO usuário (nome, email, senha, permissao) VALUES ('Admin Master', 'adminMaster@gmail.com', 'admin123', 3);
INSERT INTO usuário (nome, email, senha, permissao) VALUES ('Kevyn Cavalcanti', 'kevyn@gmail.com', 'senha123', 2);

-- Inserção de categorias
INSERT INTO categoria (nome, urlimagem) VALUES ('Minecraft', 'https://play-lh.googleusercontent.com/27O5tpaYE82W6m30rJ_MX3-UvshlDM6O8oXDxb6GseYW2T7P8UNT19727MGmz-0q3w');

INSERT INTO categoria (nome, urlimagem) VALUES ('Overwatch 2', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Overwatch_circle_logo.svg/2048px-Overwatch_circle_logo.svg.png');

INSERT INTO categoria (nome, urlimagem) VALUES ('Among Us', 'https://img.utdstc.com/icon/015/d1c/015d1cecf14c3ef529e92d788304fe58aa571c4e3ebaf4d78d5eea44f693c844:200');

INSERT INTO categoria (nome, urlimagem) VALUES ('Sea of Thieves', 'https://i.scdn.co/image/ab6761610000e5ebedda092170e6378c32a4a961');

INSERT INTO categoria (nome, urlimagem) VALUES ('Cuphead', 'https://img-eshop.cdn.nintendo.net/i/139836b3193bb50dab4982ac706d5d5d148fb7cc34ff3c6c21c34cdefa4f5df7.jpg');

INSERT INTO categoria (nome, urlimagem) VALUES ('R.E.P.O', 'https://cdn2.steamgriddb.com/icon/0504b3f1ca5994854e8718b2090ab098.ico');

INSERT INTO categoria (nome, urlimagem) VALUES ('Fnaf', 'https://i.redd.it/niatwi98l6t61.png');

INSERT INTO categoria (nome, urlimagem) VALUES ('Poppy Playtime', 'https://play-lh.googleusercontent.com/LmZuGeTmqAA3BTvSHvS7HSFOUfpajbknRhELZmoCHllZ27QZlhyPjD9urOrZwZAFM-A');

INSERT INTO categoria (nome, urlimagem) VALUES ('Sonic', 'https://cdn2.steamgriddb.com/icon/19b650660b253761af189682e03501dd.png');

INSERT INTO categoria (nome, urlimagem) VALUES ('Super Mario', 'https://media.gamestop.com/i/gamestop/20011358_ALT01/Super-Mario-Mario-and-Luigi-Circle-2-Pack-Canvas?$pdp$');

INSERT INTO categoria (nome, urlimagem) VALUES ('Outros', 'https://cdn-icons-png.flaticon.com/512/3082/3082048.png');

--Inserção de Brinquedos
INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Funko POP - Tracer', 89.90, 'Overwatch 2', 'Boneco Funko POP! Games - Overwatch: Tracer #550', 'Boneco colecionável de vinil com base do personagem Tracer', 'Funko', 'https://imgs.casasbahia.com.br/1568085601/1xg.jpg?imwidth=500');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('LEGO Minecraft', 119.99, 'Minecraft', 'LEGO Minecraft - Expedição do Steve ao Deserto - 75 Peças - 21251', 'Conjunto com 75 peças baseado no mundo do Minecraft', 'LEGO', 'https://superlegalbrinquedos.vtexassets.com/arquivos/ids/228379-800-auto?v=638429965434500000&width=800&height=auto&aspect=true');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Action Figure Among Us', 42.99, 'Among Us', 'ACTION FIGURE AMONG US - Boneco among us vermelho, 10cm', 'Boneco articulado do personagem vermelho com 10cm de altura,  o personagem do game mais jogado da atualidade virou boneco', 'Novabrink', 'https://rihappy.vtexassets.com/arquivos/ids/1996954-1200-auto?v=637699252718330000&width=1200&height=auto&aspect=true');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Funko Pop Mei do Overwatch', 119.90, 'Overwatch 2', 'Funko Pop Overwatch 180 Mei', 'Deixe o mundo Pop invadir sua casa! Os bonecos Funko Pop fazem parte de uma gigantesca coleção de bonecos colecionáveis geek, trazendo os personagens favoritos de filmes, séries, mangás, desenhos animados, novelas de sucesso e muito mais.', 'Funko', 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTc0ExQtl4NDNAOIUDkUmtJbQBpmvYX3LN_QHWCkqnTFmifydNWfN14qUa5kEoEcovDhdO4Iv2HBJGOPVocLvbvOqntN_dOHv8otOwo3VJcROO_E0fAbXjH');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('R.E.P.O', 65.00, 'R.E.P.O', 'Brinquedo do R.E.P.O', 'Modelo robótico impresso em 3D baseado no jogo de terror R.E.P.O', 'Plástico', 'https://a-static.mlcdn.com.br/800x560/criancas-horror-r-e-p-o-robo-estatua-figura-brinquedo-repo-jogo-modelo-boneca-presente-figuras-de-mobokono/aliexpress/204060016/6ee12b81aad25c43936345e6bc3a2f7c.jpeg');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Boneco Steve do Minecraft', 80.35, 'Minecraft', 'Boneco Minecraft Steve com Acessórios', 'A partir de agora, a brincadeira vai ficar ainda mais divertida com o boneco Minecraft com 8cm de altura da Mattel. Acompanha acessórios para completar a diversão. Crie, explore e viva aventuras com os personagens de Minecraft. Cada figura, segue o visual pixelizado do jogo, é perfeita para brincar com os seus amigos. Com articulações flexíveis, posicione os personagens em diversas ações. É o presente ideal para fãs de Minecraft que amam construir mundos inmersivos.', 'Mattel', 'https://a-static.mlcdn.com.br/800x560/boneco-minecraft-mattel-com-acessorios-mattel/magazineluiza/238381100/3d69c268e146cbbd52e8efca20fd41db.jpg');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('LEGO Star-Wars', 499.90, 'Outros', 'LEGO da nave Millenium Falcon', 'LEGO Star Wars com mais de mil peças detalhadas da Millenium Falcon', 'LEGO', 'https://www.anneclairebaby.com/cdn/shop/files/81lER2SxQeL._AC_SL1500.jpg?v=1731579199');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Picareta de Ouro do Minecraft', 235.10, 'Minecraft', 'Brinquedo Picareta De Ouro 35cm Minecraft - Mattel JCV19', 'Dê vida ao mundo do Minecraft com acessórios de brinquedo de batalha de RPG. As peças de batalha em tamanho real cabem nas mãos de uma criança ao lutar contra esqueletos ou afastar zumbis. Os designs permanecem fiéis ao mundo único e pixelado do Minecraft. Os fãs podem capturar a emoção de jogar cenários do Minecraft na vida real. Contém: 1 Picareta De Ouro Idade Recomendada: 6+ Anos Medidas: Aproximadamente 35cm Comprimento Material: Plástico Franquia: Minecraft Marca: Mattel', 'Mattel', 'https://rihappy.vtexassets.com/arquivos/ids/8174077-1200-auto?v=638807913177070000&width=1200&height=auto&aspect=true');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Boneco POP do CASSIDY', 135.00, 'Overwatch 2', 'Boneco POP! OVERWATCH 2 - CASSIDY #904 – FUNKO', 'Fortaleça e defenda sua coleção de Overwatch 2 com o Pop! Cassidy. Esse herói de dano está pronto para usar suas habilidades de pistoleiro para liderar sua equipe rumo à vitória. Figura colecionável tem aproximadamente 11,3 cm de altura.', 'Funko', 'https://m.media-amazon.com/images/I/61zGnr6aHtL._AC_SX679_.jpg');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Ovelha vermelha do Minecraft', 139.98, 'Minecraft', 'Boneco Minecraft Caves E Cliffs - Ovelha Vermelha', 'As articulações móveis permitem que os personagens icônicos façam poses de ação, e cada figura vem com 2 blocos de papel e um acessório. Grande presente para os fãs do Minecraft que amam construir no mundo envolvente do Minecraft.', 'Matell', 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQKyer_PZWBbVuncK2E69xN2z-Z3YnZSrWwr-sLrMcFiNNoO7Y3KEE9WQ5Hj01otyUB20FV4SD90Bl-ZBCvRg0GtzbNlZMPRy_V-RsaNO8u-1csyqbtZ9K0');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Funko pop Reaper', 139.50, 'Overwatch 2', 'Boneco Funlo POP! OVERWATCH 2 - REAPER #902 - FUNKO', 'Fortaleça e defenda sua coleção de Overwatch 2 com Pop! Overwatch. Este herói ofensivo está pronto para usar suas habilidades e sombrias únicas para levar seu time à vitória. A figura de vinil de vinil tem aproximadamente 10 centímetros de altura.', 'Funko', 'https://m.media-amazon.com/images/I/71SAW342k8L._AC_SX679_.jpg');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Telefone Feliz', 29.90, 'Outros', 'Brinquedo educativo de atividades e entretenimento para bebês', 'Telefone colorido com botões e rodinhas para bebês', 'Desconhecida', 'https://images.tcdn.com.br/img/img_prod/841504/telefone_feliz_brinquedo_educativo_de_atividades_e_entretenimento_para_bebes_259113_1_0414dc8dfda38519d21c076011c53e27.jpg');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Funko Pop Genji', 179.90, 'Overwatch 2', 'Funko Pop Genji Overwatch 551, Multicolorido', 'Continue construindo sua coleção com o Genji Pop! figura de Overwatch 2. Pop! figuras dão vida aos seus personagens favoritos de Overwatch com um design estilizado exclusivo. Cada figura de vinil mede 3,75 polegadas de altura e vem em uma embalagem com visor transparente, tornando-as excelentes para exibição. Dados Técnicos: Fabricante: Funko Série: OVERWATCH Material: Vinil Tamanho: 9,4 cm', 'Funko POP', 'https://m.media-amazon.com/images/I/71Y2y6l+iUL._AC_SX679_.jpg');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Boneco Creeper do Minecraft', 199.99, 'Minecraft', 'Boneco Creeper 25 cm - Minecraft Jfr69 - Mattel', 'Creeper é um dos personagens mais populares do jogo Minecraft. Uma estatueta do primeiro filme sobre o jogo "Minecraft" (estreia em 03.04.2025). A figura é detalhada e possui partes móveis, o que garante sua originalidade.', 'Mattel', 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRwGgcPGpr0Wmld2X-q9PFxd3OB_stzBq_dUWfLQbtRaDJDJ1orWbNGaYYDL6j8KSJG5rPdrVZ6WZk4aW1zoTuNsFrfLXge8UUC4GUQSAjSkbYsNj1DhLmw');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Pelúcia Spike Brawl Stars', 89.99, 'Outros', 'Boneco Spike 25 cm - Brawl Stars', 'Um brinquedo fofo e misterioso do jogo brawl stars', 'Supercell Toys', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5VmGC1ScLDbaRZ173i41CS7Pmo28wyuFMJ2ZqBseVo2ignj6J5JDsnWyxJ34706rEvDk&usqp=CAU');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Golden Freddy Pelúcia', 79.99, 'Fnaf', 'Pelúcia Freddy 10 cm - FNAF', 'Se apertar o nariz, faz fonfon', 'Fazbear Entertainment', 'https://img.joomcdn.net/81c74d58279c54a9733c0d40511d2213318df6d2_1024_1024.jpeg');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Pelúcia Huntress', 69.99, 'Outros', 'Pelúcia Huntress 10 cm - DBD', 'Especial de Halloween!', 'Behavior Toys', 'https://www.picclickimg.com/ojsAAOSw4nNnEI1N/Huntress-Plush-Dead-by-Daylight-DBD-SEGA-Rabbit.webp');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Knight Hollow Knight', 109.90, 'Outros', 'Boneco do personagem Knight do jogo Hollow Knight', 'Figura estilizada do protagonista do aclamado jogo indie Hollow Knight, com acabamento detalhado e alta durabilidade.', 'Team Cherry', 'https://http2.mlstatic.com/D_NQ_NP_990544-CBT72346245094_102023-O.webp');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Huggy Wuggy Poppy Playtime', 89.90, 'Poppy Playtime', 'Boneco do personagem Huggy Wuggy do jogo Poppy Playtime', 'Pelúcia detalhada de Huggy Wuggy, com aparência fiel ao personagem do jogo de terror Poppy Playtime.', 'Mob Entertainment', 'https://guejutoys.com.br/cdn/shop/products/Sf6df21c0763f4a5a8b16ae396e343b36d.jpg?v=1649726604');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Alucard Castlevania', 129.90, 'Outros', 'Boneco do personagem Alucard da série Castlevania', 'Figura articulada de Alucard com acabamento premium, baseada no personagem da série Castlevania.', 'Konami', 'https://www.merchoid.com/media/mf_webp/jpg/media/catalog/product/cache/bfcb5e98c93238c53d4013e78676b669/l/a/lab340015_2.webp');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Chomper Plants vs Zombies', 94.90, 'Outros', 'Boneco da planta Chomper do jogo Plants vs Zombies', 'Boneco da planta carnívora Chomper com visual fiel ao jogo Plants vs Zombies. Ideal para fãs da franquia.', 'PopCap Games', 'https://gw.alicdn.com/imgextra/i3/3417880949/O1CN01VxH3nI1IsgPausYLy_!!3417880949.jpg');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Peely Fortnite', 112.50, 'Outros', 'Boneco do personagem Peely do jogo Fortnite', 'Figura do personagem em forma de banana Peely, com articulações e visual vibrante fiel ao jogo Fortnite.', 'Epic Games', 'https://images.tcdn.com.br/img/img_prod/664029/mcfarlane_fortnite_solo_mode_core_peely_yellow_5161_1_104ad17a1733159c662f1a31352f5511_20220606150141.jpg');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Helena Identity V', 107.90, 'Outros', 'Boneco da personagem Helena do jogo Identity V', 'Figura da personagem Helena Adams, com detalhes fiéis ao visual do jogo.', 'NetEase', 'https://img.fruugo.com/product/4/28/1598076284_0340_0340.jpg');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Cuphead Cuphead', 109.90, 'Cuphead', 'Boneco do personagem Cuphead do jogo Cuphead', 'Figura estilizada de Cuphead, com acabamento em vinil e visual baseado na estética retrô do jogo.', 'Studio MDHR', 'https://m.media-amazon.com/images/I/51yzNqKdAzL._AC_UF894,1000_QL80_.jpg');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Sheldon o motoqueiro da série Sonic', 4599.99, 'Sonic', 'Sheldon o motoqueiro da série Sonic','Figura articulada de Shadow the Hedgehog com sua clássica moto, ideal para colecionadores da franquia Sonic.', 'SEGA', 'https://m.media-amazon.com/images/I/71-mD8yX1CL.jpg');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Yoshi Mario', 97.90, 'Super Mario', 'Boneco do personagem Yoshi da franquia Super Mario', 'Figura colecionável do Yoshi com acabamento colorido e expressão alegre, ideal para fãs de Mario.', 'Nintendo', 'https://supertoysandhobbies.com.au/cdn/shop/files/192995413993_1.jpg?v=1716196528');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Youtooz Megalodon', 727.86, 'Sea of Thieves', 'Youtooz Megalodon 3.2 inch Vinyl Figure', 'Youtooz Megalodon 3.2 inch Vinyl Figure, Collectible Megalodon Shark Figure by Youtooz Sea of Thieves Collection', 'Mar', 'https://m.media-amazon.com/images/I/611I3xb9HGL._AC_SX466_.jpg');
