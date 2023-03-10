# Jest Coverage Gate

Проверка покрытия измененных файлов.

## Основные особенности:

- Раздельные настройки coverage threshold для новых и измененных файлов
- Возможность указать `target` ветку относительно которой будет вычисляться `diff`
- `Coverage Gate` учитывает конфигурацию `jest'а` - `collectCoverageFrom`

## Как использовать?

1. Добавить `jest-coverage-gate` в качестве репортера в `jest config`:

```js
{
  reporters: [
    'default', // оставляем дефолтный репортер jest
    [
      'jest-coverage-gate',
      {
        since: 'develop', // указываем ветку, относительно которой будет вычисляться diff
        modified: {
          branches: 50,
          functions: 50,
          lines: 50,
          statements: 50,
        },
        added: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    ],
  ],
}
```

2. Запустить jest с опцией coverage

```bash
jest --coverage
```

## Почему не подошла опции `--changedSince`

При проверке покрытия с опцией `--changedSince`, `jest` не учитывает новые файлы для которых отсутствуют тесты. Также, не возможно указать разные настройки покрытия для новых и измененных файлов.
