# CalcNutrición UCI

**Calculadora de Nutrición Artificial en Paciente Crítico**  
Basada en protocolo clínico para UCI

---

## 📋 Descripción

CalcNutrición UCI es una herramienta web interactiva para calcular requerimientos nutricionales en pacientes críticos hospitalizados. Integra:

- **Nutrición Enteral (NE)** — entubación gástrica, yeyunal o SNY
- **Nutrición Parenteral (NPT)** — soporte nutricional intravenoso
- **Pauta de Tolerancia** — protocolo de inicio progresivo con control de débito cada 8 h
- **Ritmo de Mantenimiento** — ajuste post-tolerancia
- **Catálogo de Fórmulas** — base editable de dietas enterales disponibles
- **NUTRIC Score** — evaluación del riesgo nutricional

---

## 🎯 Características Principales

### 1. **Nutrición Enteral (N. Enteral)**
- Cálculo automático de requerimientos por peso y protocolo (IBW, peso actual, peso ajustado)
- Selector de fase clínica en 3 etapas: aguda, subaguda y crónica
- Ajuste automático de objetivos nutricionales según fase clínica
- **Protocolos renales diferenciados:**
  - Sin depuración extrarrenal
  - Técnica continua (CRRT: HFVVC, HDFVVC, HDVVC) — objetivos proteicos aumentados, restricción HC 70%, monitorización fósforo
  - Hemodiálisis intermitente (IHD) — objetivos intermedios, monitorización fósforo
- Selección inteligente de fórmula basada en fase clínica, IMC y cobertura de nitrógeno
- Detección automática de necesidad de suplementación proteica con RENAPRO
- **Ajuste por Citrato externo (300 kcal / 75 g HC)** — disponible únicamente cuando la técnica renal activa es CRRT
- Soporte para yeyunostomía (restringe a fórmulas oligoméricas)
- Tabla comparativa de fórmulas con desviación de N₂ calculada

### 2. **Nutrición Parenteral (N. Parenteral)**
- Selector de fase clínica en 3 etapas: aguda, subaguda y crónica
- Ajuste automático de objetivos nutricionales según fase clínica
- Protocolos renales diferenciados (igual que enteral)
- NPT individualizada con composición macronutrientes (N₂, glucosa, lípidos)
- Relación ajustable lípidos:HC
- Propofol externo integrado (descuento automático de kcal/lípidos)
- Citrato activo (300 kcal / 75 g HC) — vinculado a modo CRRT
- Bloque visual de composición 24 h

### 3. **Pauta de Tolerancia (24 h)**
- Tres fases de 8 h con ritmos de inicio automáticos en cada control de débito
- Cálculo de volumen total administrado en 24 h
- Reajuste anterógrado del ritmo tras cada pausa, según el volumen pendiente al inicio de cada fase
- Barra de progreso del objetivo
- Alertas clínicas:
  - <50%: déficit crítico
  - 50–100%: déficit parcial (se completa en ritmo)
  - ≥100%: objetivo cubierto
- Botón para aplicar automáticamente volumen desde prescripción enteral
- Modo yeyunal/SNY con ritmo único continuo en turnos de 12 h

### 4. **Ritmo de Mantenimiento**
- Cálculo del ritmo de continuación post-tolerancia
- Reajuste del ritmo tras pausas considerando el volumen administrado antes de cada reinicio
- Contador de volumen restante
- Modalidad de control: c/12 h o c/24 h (para débito gástrico)
- Recomendaciones según frecuencia

### 5. **Catálogo de Fórmulas**
- Base de datos protegida por contraseña (`Nutr1`)
- Import/export JSON
- 16 fórmulas preconfiguradas (poliméricas, oligoméricas, específicas, esp. críticos)
- Edición en línea con validación
- Restauración a valores por defecto

### 6. **Sistema de Roles y Sesión**
- Pantalla de selección de rol al iniciar: **Médico** o **Auxiliar de Enfermería**
- Rol **Auxiliar**: flujo en dos pasos — selección de rol → introducción del **número de box**
  - Badge visible en la cabecera con el box asignado (📦 Box N)
  - Sesión persistida en localStorage hasta las 08:30 del día siguiente
- **Botón Salir** (🚪) en la cabecera — guarda datos del formulario y vuelve al selector de rol
  - Persiste volúmenes objetivo (`t-vol`, `r3-vol`), estado yeyuno/SNY y todas las pausas (tol1/tol2/tol3/r3a/r3b) hasta las 08:20 del día siguiente
  - Al reentrar con el mismo rol, los datos del turno anterior se restauran automáticamente

### 7. **NUTRIC Score**
- Cálculo automático de riesgo nutricional
- Parámetros: edad, APACHE II, SOFA, comorbilidades, días pre-UCI, IL-6 (opcional)
- Puntuación 0–10 con categorización riesgo bajo/alto
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

3. **Seleccionar protocolo renal** (opcional)
   - Sin depuración extrarrenal (por defecto)
   - CRRT — aumenta objetivos proteicos; activa la opción de Citrato; fuerza HC ≤70%
   - IHD — objetivos proteicos intermedios; monitorización fósforo

4. **Elegir fase clínica**
   - Aguda (0–72 h): 15 → 20 kcal/kg/día; proteína según protocolo renal
   - Subaguda (4º–7º día): 20 → 25 kcal/kg/día
   - Crónica (>1 semana): 25 → 30 kcal/kg/día

5. **Relación HC:Lípidos** — slider ajustable (40–70% HC; forzado a 70% en CRRT)

5. **Sistema recomienda fórmula**
   - Se filtra según fase, IMC y cobertura N₂ (70–110%)
   - Muestra volumen 24h, ritmo, déficit proteico

7. **Aplicar a Pauta de Tolerancia**
   - Botón automático copia volumen → Pauta → Ritmo

### Pauta de Tolerancia (primeras 24 h)

1. Definir el volumen objetivo total (ml/24 h)
2. Revisar los 3 bloques de 8 h (08:00–16:00, 16:00–00:00 y 00:00–08:00)
3. Registrar pausas o tiempo sin nutrición en cada fase
4. Ver resultado: volumen total, % cobertura, alertas y ritmo calculado en cada control

### Ritmo de Mantenimiento (post-tolerancia)

1. Confirmar volumen objetivo 24h
2. Marcar pausas previstas o realizadas en cada turno
3. Revisar el ritmo inicial y el ritmo de reinicio tras cada pausa
4. El sistema recalcula el ritmo con el volumen pendiente

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
│   │   ├── panel-enteral (2 columnas)
│   │   ├── panel-parenteral (2 columnas)
│   │   ├── panel-tolerancia (2 columnas)
│   │   ├── panel-ritmo (2 columnas)
│   │   └── panel-catalogo (gestión + catálogo)
│   ├── Modal NUTRIC Score
│   └── Script <script>
│       ├── Datos (DEFAULT_FORMULAS, RENAL_PROTOCOLS)
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
│       ├── Roles y sesión
│       │   ├── selectRole() — selección Médico/Auxiliar
│       │   ├── confirmBox() — validación y guardado de box (auxiliar)
│       │   ├── applyAuxiliarRole() — aplica modo auxiliar + badge
│       │   ├── clearAuxSession() — limpia sesión del rol
│       │   ├── saveFormData() — persiste volúmenes y pausas del turno
│       │   ├── restoreFormData() — restaura datos al reentrar
│       │   └── salir() — guarda datos, limpia sesión, muestra overlay
│       ├── Protocolos renales (toggleRenalChoice, setCit)
│       ├── UI (renderTable, updates)
│       └── Init
```

---

## 🔧 Parámetros Clave

| Parámetro | Descripción | Valores Típicos |
|-----------|-------------|-----------------|
| **kcal/kg** | Necesidad calórica diaria | 25–35 kcal/kg |
| **g prot/kg** | Aporte proteico | 0.8–2.5 g/kg (según protocolo renal) |
| **Propofol** | Infusión sedativa | 0–500 ml/día |
| **Citrato** | Anticoagulante CRRT (solo modo CRRT) | 300 kcal / 75 g HC |
| **HC/Lípidos** | Ratio energético | 40–70% HC; 30–60% Lip (CRRT: forzado HC 70%) |
| **N₂ óptimo** | Relación kcal NP / g N₂ | 100–130 kcal/g N₂ |
| **RENAPRO** | Suplemento proteico | 1 sobre ≈ 19.4 g proteínas |

---

## 💾 Persistencia de Datos

### LocalStorage
- **nutri_enteral_formulas_v1** — array JSON de fórmulas personalizadas; se carga al iniciar y se sincroniza con el gestor
- **nutri_session_v1** — sesión del rol auxiliar (box asignado); expira a las 08:30 del día siguiente
- **nutri_form_data_v1_box_{N}** — datos del formulario del turno para el box N (volúmenes, pausas, yeyuno/SNY); expira a las 08:20 del día siguiente; se restaura automáticamente al introducir el mismo número de box

---

## 🎨 Tema Visual

- **Variables CSS**:
  - `--bg` / `--card` / `--border` (colores base)
  - `--text` / `--muted` / `--dim` (textos)
  - `--primary` / `--secondary` / `--accent` (acentos)
- Fondo general más claro y contraste reforzado para mejorar la lectura de paneles y mensajes contextuales
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
| 📋 Pauta Tolerancia | Protocolo 24 h con control de débito cada 8 h |
| ⏱ Ritmo N. Enteral | Ritmo mantenimiento post-tolerancia |
| 📚 Catálogo Fórmulas | Gestión + catálogo farmacia |

---

## 🚀 Inicialización

Al cargar la página:
1. Se restauran fórmulas desde localStorage (o usa defaults)
2. Se calculan todos los tabs (calcEnteral, calcParenteral, etc.)
3. Se establece fase clínica por defecto (aguda) en Enteral y Parenteral
4. Se bloquea gestor de fórmulas
5. Se restauran datos del formulario del turno anterior (`restoreFormData`) si aún no han caducado
6. Se muestra el selector de rol (siempre al (re)entrar)

---

## 📝 Fórmulas Base Incluidas (16)

**Poliméricas:**
- Isosource Protein, Isosource Protein Fibre, Isosource 2.0 Protein Fibre
- Fresubin 2 HP Fibra, Novasource GI Protein, Novasource Protein Plus Energy
- Tdiet HP, SondAvant Estándar, Nutrison Multifibre

**Oligoméricas:**
- Peptamen AF Enteral (recomendada para yeyuno/SNY)

**Específicas:**
- Diaba HP, Nutrison Adv. DIASON ENERGY HP, Novasource Diabet (diabetes)
- Ensure Plus Advance RTH (hipercalórica hiperproteica)

**Esp. Críticos:**
- Atempero (fase aguda — especial críticos)

**Inmunomoduladora:**
- Impact Enteral

---

## 📞 Contacto

**Creado para:** UCI — H. Santa Lucía (Cartagena)  
**Autor:** luisherrerapara@gmail.com  
**Todos los derechos reservados.**

---

## 📄 Licencia

Uso exclusivo clínico — Hospital Santa Lucía.
