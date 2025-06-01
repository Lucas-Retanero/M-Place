-- Inserção de usuário
INSERT INTO usuário (nome, email, senha, permissao) VALUES ('Admin Master', 'adminMaster@gmail.com', 'admin123', 3);

-- Inserção de categorias
INSERT INTO categoria (nome, urlimagem) VALUES ('Minecraft', 'https://play-lh.googleusercontent.com/27O5tpaYE82W6m30rJ_MX3-UvshlDM6O8oXDxb6GseYW2T7P8UNT19727MGmz-0q3w');

INSERT INTO categoria (nome, urlimagem) VALUES ('Overwatch 2', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Overwatch_circle_logo.svg/2048px-Overwatch_circle_logo.svg.png');

INSERT INTO categoria (nome, urlimagem) VALUES ('Among Us', 'https://img.utdstc.com/icon/015/d1c/015d1cecf14c3ef529e92d788304fe58aa571c4e3ebaf4d78d5eea44f693c844:200');

INSERT INTO categoria (nome, urlimagem) VALUES ('R.E.P.O', 'https://play-lh.googleusercontent.com/eXY7v6i7itGh46lRgGJBui5m-r75CSz2WQZ8UAED7sntbMU5tD0eQgIj4UwK4-qSO5k=w240-h480-rw');

INSERT INTO categoria (nome, urlimagem) VALUES ('Outros', 'https://cdn-icons-png.flaticon.com/512/3082/3082048.png');

INSERT INTO categoria (nome, urlimagem) VALUES ('Montar', 'https://down-br.img.susercontent.com/file/aa45851cb0225eaffbf7eea6588625f2');

--Inserção de Brinquedos
INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Funko POP - Tracer', 89.90, 'Overwatch 2', 'Boneco Funko POP! Games - Overwatch: Tracer #550', 'Boneco colecionável de vinil com base do personagem Tracer', 'Funko', 'https://imgs.casasbahia.com.br/1568085601/1xg.jpg?imwidth=500');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('LEGO Minecraft', 119.99, 'Minecraft', 'LEGO Minecraft - Expedição do Steve ao Deserto - 75 Peças - 21251', 'Conjunto com 75 peças baseado no mundo do Minecraft', 'LEGO', 'https://superlegalbrinquedos.vtexassets.com/arquivos/ids/228379-800-auto?v=638429965434500000&width=800&height=auto&aspect=true');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Action Figure Among Us', 42.99, 'Among Us', 'ACTION FIGURE AMONG US - Boneco among us vermelho, 10cm, o personagem do game mais jogado da atualidade virou boneco', 'Boneco articulado do personagem vermelho com 10cm de altura', 'Novabrink', 'https://rihappy.vtexassets.com/arquivos/ids/1996954-1200-auto?v=637699252718330000&width=1200&height=auto&aspect=true');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('R.E.P.O', 65.00, 'R.E.P.O', 'Brinquedo do R.E.P.O', 'Modelo robótico impresso em 3D baseado no jogo de terror R.E.P.O', 'Plástico', 'https://a-static.mlcdn.com.br/800x560/criancas-horror-r-e-p-o-robo-estatua-figura-brinquedo-repo-jogo-modelo-boneca-presente-figuras-de-mobokono/aliexpress/204060016/6ee12b81aad25c43936345e6bc3a2f7c.jpeg');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('LEGO Star-Wars', 499.90, 'Montar', 'LEGO da nave Millenium Falcon', 'LEGO Star Wars com mais de mil peças detalhadas da Millenium Falcon', 'LEGO', 'https://www.anneclairebaby.com/cdn/shop/files/81lER2SxQeL._AC_SL1500.jpg?v=1731579199');

INSERT INTO brinquedo (nome, preco, categoria, descricao, detalhes, marca, urlimagem) VALUES ('Telefone Feliz', 29.90, 'Outros', 'Brinquedo educativo de atividades e entretenimento para bebês', 'Telefone colorido com botões e rodinhas para bebês', 'Desconhecida', 'https://images.tcdn.com.br/img/img_prod/841504/telefone_feliz_brinquedo_educativo_de_atividades_e_entretenimento_para_bebes_259113_1_0414dc8dfda38519d21c076011c53e27.jpg');
