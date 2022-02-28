# Como usar Kenzie Market #

## Usuário ##

- Para criar um usuário é necessário informar `user_name` (string), `user_email` (string), `user_password` (string) e `is_admin` (booleano) no corpo de uma requisição `POST` na rota `/user`;

- Para logar com o usuário, é necessário informa o `email` (string) e a `password`(string) no corpo de uma requisição `POST` na rota `/login`;

- Para listar todos os usurários, basta fazer uma requisição `GET` na rota `/user`;

- Para acessar um usuário em específico, basta fazer uma requisição `GET` na rota `/user/id`.

## Produto ##

- Para criar um produto novo, é necessário informar o `product_name` (string), `product_description` (string), `price` (inteiro) e `amount_in_stock` (inteiro) no corpo de uma requisição `POST`na rota `/product`. A funcionalidade de controle de estoque, alterando sua quantidade não foi implementada; 

- Para listar todos os produtos, basta fazer uma requisição `GET` na rota `/product`. Essa rota é exclusiva para administradores;

- Para listar um produto em específio, basta fazer uma requisição `GET` na rota `/product/id`.

## Carrinho ##

- Um novo carrinho é criado sempre que um usuário novo é registrado;

- Para adicionar um item novo a um carrinho, é necessário fazer uma requisição `POST` na rota `/cart` e informar, no seu corpo, o `product_id`, sendo este o id do produto a ser inserido. Não é necessário informar o id do carrinho, pois este já é buscado pelo token da sessão, já que esta rota só é acessível para quem estiver logado na plataforma. 

- Para deletar um produto do carrinho, basta fazer uma requisição `DELETE` na rota `/cart/id`, onde 'id' refere-se ao produto. 

- Para listar todos os carrinhos, basta fazer uma requisição `GET` na rota `/cart`;

- Para listar um carrinho em específico, é necessário fazer uma requisição `GET` na rota `/cart/id`, e informar o 'id' do carrinho.

## Encerrando uma compra ##

- Para encerrar um compra (fechar um carrinho), é necessário fazer uma requisição do tipo `POST` na rota `/buy`. Não é necessário informar nada, pois o carrinho é pego diretamente pelo token da sessão; 

- Para ver todas as compras finalizadas, ou todos os carrinhos fechados, basta fazer uma requisição `GET` na rota `/buy`. Essa rota é exclusiva para administradores.

- Para pegar uma compra finalizada específica, ou um carrinho que foi "fechado", basta fazer uma requisição `GET` na rota `/buy/id`, sendo o 'id' referente ao carrinho.

## Email ##

- Para enviar um email qualquer para um determinado usuário, basta fazer uma requisição `POST` na rota `/email` e informar, no seu corpo, o `user_email` (destinatário: string), `email_subject` (assunto: string), `email_text` (conteúdo: string);

- Para gerar o código de recuperação de senha, é necessário fazer uma requisição `POST` na rota `/recuperar`. O email será pego indiretamente pelo token da sessão. 

- Para alterar a senha, de fato, é necessário fazer uma requisição do tipo `POST` na rota `/alterar_senha`, informando no seu corpo o `password_code` (código de alteração, enviado no email: string), `new_password` (nova senha: string), `new_password_confirm` (confirmação da senha nova: string).
