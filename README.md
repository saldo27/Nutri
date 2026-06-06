# CalcNutrición UCI

Calculadora web para soporte nutricional en paciente crítico (UCI), con módulos de nutrición enteral y parenteral, pauta de tolerancia, ritmo de mantenimiento y NUTRIC Score.

## Resumen

- Archivo principal: `index.html` (app cliente, sin backend).
- Persistencia local de fórmulas enterales por `localStorage`.
- Enfoque clínico: cálculo por fase, peso seleccionado, y ajustes por aportes externos.

## Funcionalidades

### N. Enteral

- Cálculo por peso actual/ideal/ajustado.
- Fase clínica: Aguda, Estabilización, Recuperación.
- Recomendación de fórmulas por fase/IMC/cobertura de N2.
- Cálculo de suplementación con RENAPRO cuando hay déficit.
- Soporte de yeyunostomía (prioriza Peptamen AF).

### N. Parenteral

- Cálculo por fase clínica y objetivos por kg.
- Bloque superior de composición con valores totales (incluye aportes externos).
- Bloque interno “Composición NPT Individualizada 24 h” con gramos y kcal base de dieta (sin aportes externos), para preparación.
- Tarjeta “Aporte Individualizado 24h” con fila de kcal administradas totales.

### INSUF.RENAL (modal)

- Botón dedicado en Enteral y Parenteral.
- Opciones:
  - No Depuración
  - Técnica continua
  - Hemodiálisis intermitente
- Selección reversible (se puede dejar sin selección).
- Si no hay selección: se mantienen los valores base de proteínas por fase.
- En Técnica continua aparece checkbox de CITRATO.

### Aportes externos: Propofol y Citrato

- Se consideran como aporte energético y de macronutrientes:
  - Propofol suma lípidos y kcal.
  - Citrato suma HC y kcal.
- El ratio/porcentaje HC-Lípidos mostrado en composición y en etiquetas del slider se calcula sobre el total efectivo (incluyendo aportes externos).
- En NPT, el bloque interno de “Composición NPT Individualizada 24 h” mantiene valores base de dieta para formulación.

### Pauta de Tolerancia y Ritmo

- Pauta 24 h en dos tramos (12 h + 12 h).
- Barra de cobertura y alertas de déficit/cobertura.
- Ritmo de continuidad post-tolerancia con control c/12 h o c/24 h.

### Catálogo de fórmulas

- Gestor protegido con contraseña `Nutr1`.
- Edición JSON, import/export, restauración por defecto.
- Persistencia en `nutri_enteral_formulas_v1`.

### NUTRIC Score

- Cálculo de score 0–10 con estratificación de riesgo.
- Estimación de mortalidad y alerta de soporte precoz.

## Fases clínicas (base)

Cuando no hay perfil renal seleccionado:

- Aguda (0–72 h): 15 -> 20 kcal/kg/día; 0.8 -> 1.0 g prot/kg/día.
- Estabilización (4º–7º día): 20 -> 25 kcal/kg/día; 1.0 -> 1.0 g prot/kg/día.
- Recuperación (>1 semana): 25 -> 30 kcal/kg/día; 1.0 -> 1.2–1.3 g prot/kg/día.

## Estructura técnica (alto nivel)

- `DEFAULT_FORMULAS` / `FORMULAS`: base y conjunto activo de fórmulas enterales.
- `S`: estado global (fase, filtros, selección renal, citrato, etc.).
- `calcPatient()`: IMC, IBW y peso ajustado.
- `calcNutr()`: núcleo de cálculos energéticos y macronutrientes.
- `calcEnteral()` / `calcParenteral()`: render de paneles y resultados.
- `calcTol()` / `calcRitmo()`: módulos de pauta y ritmo.
- `calcNutricScore()`: modal NUTRIC.

## Uso local

Al ser estática, basta abrir `index.html` en navegador.

Opcionalmente, servir por HTTP local:

```bash
python -m http.server 8000
```

Luego abrir `http://localhost:8000`.

## Seguridad y alcance

- Sin envío de datos a servidor.
- Todo se procesa en navegador.
- Herramienta de apoyo: no sustituye juicio clínico.

## Contacto

- Autor: luisherrerapara@gmail.com
- Entorno de uso: UCI H. Santa Lucía (Cartagena)
