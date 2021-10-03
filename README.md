# UchiHack: Модуль взаимного обучения. Создан by NUST MISIS - just a Broken Machine

## Реализованная функциональнось
- Выбирайте **школьные предметы**, в которых вы компетентны при регистрации. **Система рекомендаций** на главной странице **предложит** вам вопросы, на которые вы, вероятнее всего, сможете дать ответ.  
- Воспользуйтесь поиском по всем вопросам или создайте свой, а **умная система фильтрации**, постоянно индексирующая новые вопросы, подскажет, если похожий вопрос уже зарегестрирован в системе.
- Также доступна **фильтрация** по: 
  - **Школьным предметам**.
  - **Тегам**. Теги представляют из себя список тем. При отсутствии темы в списке, есть возможность задать свою, с последующим её добавлением в общий список тем.
  - **Ценности вопроса**.
  - **Времени**, к которому вопрос должен быть решен.
    
- Отслеживайте свой рейтинг в разделе **"Рейтинг"**. Рейтинг сформирован на основе количества ответов, на которые вы ответили, и монеток, которые вы заработали, отвечая на эти вопросы.
- Нажмите на понравившегося вам пользователя и перейдите на его **страницу**. Там будет указана его краткая статистика, а также популярные вопросы и ответы, созданные им.

## Ообенности проекта в следующем
- Накапливайте **монетки**, отвечая на вопросы.
- **Создавайте вопрос**, используя накопленные **монетки**.
- **Голсоуйте** монетками за понравившийся вопрос. Это способствует продвижению вопроса в поисковой выдаче.
- **Распределяйте** свои вложенные монетки среди ответивших на вопрос. Пользователь, ответивший на вопрос, получит их при закрытии вопроса.

- Создавший вопрос / Поддержавший вопрос / Ответивший на вопрос имею доступ к **общему чату**.
- Пользователь, создавший вопрос, и ответивший на него, могут связываться напрямую через **персональный чат 1 на 1**.

- **Приглашайте** пользователей в свой вопрос. Ему придет **уведомление** на главной странице.

## Основной стек технологий
- **Backend**: Golang, PostgreSQL
- **Frontend**: JS, React
- **Production deploy tools**: Docker, NGINX

## Демо
Приложение доступно по [адресу](http://139.162.131.165).
Оно полностью готово к использованию. Скорее создавайте аккаунт и погружайтесь в мир взаимного обучения вместе с Учи.ру и командой NUST MISIS - just a Broken Machine!
Скринкаст доступен по [адресу](http://139.162.131.165).

## Необходимые условия для работы преложения
При деплое приложения на сервер, **Production build** разворачивается проще простого с помощью средств докера. Для этого достаточно написать всего-лишь одну строчку:
```bash
docker-compose build && docker-compose up -d
```
Чтобы запустить **Development build**, используйте следующую инструкцию:
### Запуск сервера
Склонируйте проект в папку go/src
```bash
cd ~/go/src
```
Отключители go modules. В этом проекте не требуется мониторинг зависимостей.
```bash
go env -w GO111MODULE=off
```
Самостоятельно установите зависимости
```bash
go get -u github.com/go-ego/riot
go get -u github.com/google/uuid
go get -u gorm.io/gorm
go get -u gorm.io/driver/postgres
```
Запустите проект
```bash
go run main.go
```

### Запуск UI
Перейдите в папку с UI
```bash
cd ui
```
Устанвите зависимости и запустите UI
```bash
npm i && npm start
```

## Разработчики
- **Вячеслав Пачков** fullstack https://t.me/pa_slava
- **Никита Мелехин** fullstack https://t.me/Rurreer