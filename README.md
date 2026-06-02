# CalcNutrición UCI

**Calculadora de Nutrición Artificial en Paciente Crítico**  
Versión 13 | Basada en protocolo clínico para UCI

---

## 📋 Descripción

CalcNutrición UCI es una herramienta web interactiva para calcular requerimientos nutricionales en pacientes críticos hospitalizados. Integra:

- **Nutrición Enteral (NE)** — entubación gástrica, yeyunal o SNY
- **Nutrición Parenteral (NPT)** — soporte nutricional intravenoso
- **Pauta de Tolerancia** — protocolo de inicio progresivo (primeras 24 h)
- **Ritmo de Mantenimiento** — ajuste post-tolerancia
- **Catálogo de Fórmulas** — base editable de dietas enterales disponibles
- **NUTRIC Score** — evaluación del riesgo nutricional

---

## 🎯 Características Principales

### 1. **Nutrición Enteral (N. Enteral)**
- Cálculo automático de requerimientos por peso y protocolo (IBW, peso actual, peso ajustado)
- Selección inteligente de fórmula basada en fase clínica (aguda/crónica), IMC y cobertura de nitrógeno
- Detección automática de necesidad de suplementación proteica con RENAPRO
- Ajuste por Citrato externo (300 kcal/75 g HC)
- Soporte para yeyunostomía (restringe a fórmulas oligoméricas)
- Tabla comparativa de fórmulas con desviación de N₂ calculada

### 2. **Nutrición Parenteral (N. Parenteral)**
- NPT individualizada con composición macronutrientes (N₂, glucosa, lípidos)
- Relación ajustable lípidos:HC
- Propofol externo integrado (descuento automático de kcal/lípidos)
- Citrato activo (igual que enteral)
- Bloque visual de composición 24 h

### 3. **Pauta de Tolerancia (24 h)**
- Dos fases de 12 h con ritmos independientes (ml/h)
- Cálculo de volumen total administrado en 24 h
- Barra de progreso del objetivo
- Alertas clínicas:
  - <50%: déficit crítico
  - 50–100%: déficit parcial (se completa en ritmo)
  - ≥100%: objetivo cubierto
- Botón para aplicar automáticamente volumen desde prescripción enteral

### 4. **Ritmo de Mantenimiento**
- Cálculo del ritmo de continuación post-tolerancia
- Contador de volumen restante
- Modalidad de control: c/12 h o c/24 h (para débito gástrico)
- Recomendaciones según frecuencia

### 5. **Catálogo de Fórmulas**
- Base de datos protegida por contraseña 
- Import/export JSON
- 16 fórmulas preconfiguradas (poliméricas, oligoméricas, específicas)
- Edición en línea con validación
- Restauración a valores por defecto

### 6. **NUTRIC Score**
- Cálculo automático de riesgo nutricional
- Parámetros: edad, APACHE II, SOFA, comorbilidades, días pre-UCI, IL-6 (opcional)
- Scoring 0–10 con categorización riesgo bajo/alto
- Estimación de mortalidad a 28 días
- Alerta para soporte nutricional precoz

---

## 🛠️ Cómo Usar

### Flujo Básico Enteral

1. **Ingresar datos del paciente**
   - Peso, talla (se calcula BMI, IBW, peso ajustado)
   - Elegir peso a usar (actual, IBW, ajustado)

2. **Definir objetivos nutricionales**
   - kcal/kg, g proteína/kg
   - Propofol externo (si aplica)
   - ¿Citrato activo? Sí/No

3. **Elegir fase clínica**
   - Aguda (0–72 h): recomienda oligoméricas/especiales
   - Crónica (>72 h): recomienda poliméricas

4. **Relación HC:Lípidos** — slider ajustable (40–70% HC)

5. **Sistema recomienda fórmula**
   - Se filtra según fase, IMC y cobertura N₂ (70–110%)
   - Muestra volumen 24h, ritmo, déficit proteico

6. **Aplicar a Pauta de Tolerancia**
   - Botón automático copia volumen → Pauta → Ritmo

### Pauta de Tolerancia (primeras 24 h)

1. Ingresar ritmo fase 1 (ml/h × 12 h)
2. Ingresar ritmo fase 2 (ml/h × 12 h)
3. Ver resultado: volumen total, % cobertura, alertas

### Ritmo de Mantenimiento (post-tolerancia)

1. Confirmar volumen objetivo 24h
2. Ingresar volumen ya administrado en tolerancia
3. Elegir modalidad control (c/12 h o c/24 h)
4. Se calcula ritmo de continuidad

---

## 📐 Estructura del Código

```
index.html
├── HEAD
│   ├── Metadatos
│   ├── CSS variables (tema claro/oscuro)
│   └── Estilos (cards, badges, tablas, modal)
├── BODY
│   ├── Header + Navegación tabs
│   ├── main.main
│   │   ├── panel-enteral (3 columnas)
│   │   ├── panel-parenteral (2 columnas)
│   │   ├── panel-tolerancia (2 columnas)
│   │   ├── panel-ritmo (2 columnas)
│   │   └── panel-catalogo (gestión + catálogo)
│   ├── Modal NUTRIC Score
│   └── Script <script>
│       ├── Datos (DEFAULT_FORMULAS)
│       ├── Estado global (S = state)
│       ├── Helpers (formatters, $, gv, sv)
│       ├── Gestión fórmulas (CRUD, import/export)
│       ├── Cálculos
│       │   ├── calcPatient() — BMI, IBW, peso ajustado
│       │   ├── calcNutr() — requerimientos macro
│       │   ├── calcEnteral() — stats + tabla
│       │   ├── calcParenteral() — composición NPT
│       │   ├── calcTol() — pauta 24h
│       │   ├── calcRitmo() — mantenimiento
│       │   └── calcNutricScore() — riesgo nutricional
│       ├── UI (renderTable, updates)
│       └── Init
```

---

## 🔧 Parámetros Clave

| Parámetro | Descripción | Valores Típicos |
|-----------|-------------|-----------------|
| **kcal/kg** | Necesidad calórica diaria | 25–35 kcal/kg |
| **g prot/kg** | Aporte proteico | 1.0–2.0 g/kg |
| **Propofol** | Infusión sedativa | 0–500 ml/día |
| **Citrato** | Anticoagulante externo | 300 kcal / 75 g HC |
| **HC/Lípidos** | Ratio energético | 40–70% HC; 30–60% Lip |
| **N₂ óptimo** | Relación kcal NP / g N₂ | 100–130 kcal/g N₂ |
| **RENAPRO** | Suplemento proteico | 1 sobre ≈ 19.4 g proteínas |

---

## 💾 Persistencia de Datos

### LocalStorage
- **nutri_enteral_formulas_v1** — array JSON de fórmulas personalizadas
- Se carga automáticamente al iniciar
- Se sincroniza con cambios en gestor

---

## 🎨 Tema Visual

- **Variables CSS**:
  - `--bg` / `--card` / `--border` (colores base)
  - `--text` / `--muted` / `--dim` (textos)
  - `--primary` / `--secondary` / `--accent` (acentos)
- **Responsive**: grid auto-fit para tablets/móviles
- **Dark mode**: compatible (usa CSS variables)

---

## 🔐 Seguridad

- **Gestor de fórmulas protegido** con contraseña: `Nutr1`
- No hay backend — todo cálculo en cliente
- Datos persisten en navegador (localStorage)

---

## 📱 Navegación

| Pestaña | Descripción |
|---------|-------------|
| 🧪 N. Enteral | Cálculo de dieta enteral + fórmulas |
| 💉 N. Parenteral | Composición NPT + macronutrientes |
| 📋 Pauta Tolerancia | Protocolo 24 h (primeras 24 h) |
| ⏱ Ritmo N. Enteral | Ritmo mantenimiento post-tolerancia |
| 📚 Catálogo Fórmulas | Gestión + catálogo farmacia |

---

## 🚀 Inicialización

Al cargar la página:
1. Se restauran fórmulas desde localStorage (o usa defaults)
2. Se calculan todos los tabs (calcEnteral, calcParenteral, etc.)
3. Se establece fase clínica por defecto (aguda)
4. Se bloquea gestor de fórmulas

---

## 📝 Fórmulas Base Incluidas

**Poliméricas:**
- Isosource Protein, Fresubin 2 HP Fibra, Novasource GI Protein, Nutrison Multifibre

**Oligoméricas:**
- Peptamen AF Enteral (recomendada para yeyuno)

**Específicas:**
- Diaba HP, Novasource Diabet, Atempero (críticos), Impact Enteral (inmunomol.)

---

## 📞 Contacto

**Creado para:** UCI — H. Santa Lucía (Cartagena)  
**Autor:** luisherrerapara@gmail.com  
**Todos los derechos reservados.**

---

## 📄 Licencia

Uso exclusivo clínico — Hospital Santa Lucía.
