# SecretSanta

Простецкая версия тайного Санты, когда все подарки пронумерованы (с 0 конечно) и надо только выбрать,
какой взять. Чтобы не получить свой подарок, надо незаметно ввести его номер. После этого рандомно
выдаётся номер подарков из тех, что ещё не были выданы.

## Сборка и запуск в docker

1. Собрать приложение: `ng build --prod`
2. Собрать и запустить контейнеры: `docker-compose up -d --build`