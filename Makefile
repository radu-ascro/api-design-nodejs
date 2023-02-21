dev:
	docker-compose --profile dev up -d

down:
	docker compose --profile dev -f ./docker-compose.yml down

reset:
	docker volume prune
