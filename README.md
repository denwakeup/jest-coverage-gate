# Jest Coverage Gate

Проверка покрытия измененных и добавленных файлов.

## Основные особенности:

- Раздельные настройки `coverage threshold` для новых и измененных файлов
- Возможность указать `target` ветку относительно которой будет вычисляться `diff`

## Как использовать?

1. Добавить `jest-coverage-gate` в качестве репортера в `jest config`:

```js
{
  coverageReporters: [
    "clover", "json", "lcov", "text", // default
    [
      'jest-coverage-gate',
      {
        since: 'develop',
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
