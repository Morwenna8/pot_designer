// shaders
var VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute vec3 a_Normal;
    uniform mat4 u_ModelMatrix;
    uniform mat4 u_GlobalRotateMatrix;
    varying vec3 v_Normal;
    void main() {
        gl_Position = u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
        v_Normal = a_Normal;
    }
`;

var FSHADER_SOURCE = `
    precision mediump float;
    uniform vec4 u_FragColor;
    varying vec3 v_Normal;
    void main() {
        vec3 lightDir = normalize(vec3(1.0, 2.0, 1.0));
        float diff = max(dot(normalize(v_Normal), lightDir), 0.0);
        float ambient = 0.7;
        float light = ambient + diff * 0.3;

        // if this is the front face, use exact color
        if (v_Normal.z < -0.9) {
            gl_FragColor = u_FragColor;
        } else {
            gl_FragColor = vec4(u_FragColor.rgb * light, u_FragColor.a);
        }
    }
`;

// global WebGL variables
let canvas;
let gl;
let a_Position;
let a_Normal;
let u_FragColor;
let u_ModelMatrix;
let u_GlobalRotateMatrix;

// rotation state
let g_mouseX = 0;
let g_mouseY = 0;

let currentColor = [1.0, 1.0, 1.0, 1.0];
let dims = { w: 5, d: 5, h: 4 };

let rotationMatrix = new Matrix4();

function changeColor(r, g, b) {
    currentColor = [r, g, b, 1.0];
    renderScene();
}

function setSize(s, btn) {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    dims = s === 'small' ? { w: 5, d: 5, h: 4 } : { w: 10, d: 5, h: 4 };
    renderScene();
}

function setupWebGL() {
    canvas = document.getElementById('webgl');
    gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
    if (!gl) { console.log('Failed to get WebGL context'); return; }
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.POLYGON_OFFSET_FILL);
    gl.polygonOffset(1.0, 1.0);
}

function connectVariablesToGLSL() {
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders'); return;
    }
    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    a_Normal = gl.getAttribLocation(gl.program, 'a_Normal');
    u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');

    var identityM = new Matrix4();
    gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
}

function main() {
    setupWebGL();
    connectVariablesToGLSL();

    let lastMouseX = 0;
    let lastMouseY = 0;

    canvas.addEventListener('mousedown', function(ev) {
        lastMouseX = ev.clientX;
        lastMouseY = ev.clientY;
    });
    
    canvas.addEventListener('mousemove', function(ev) {
        if (ev.buttons == 1) {
            const dx = ev.clientX - lastMouseX;
            const dy = ev.clientY - lastMouseY;
    
            // apply incremental rotation to the accumulated matrix
            var deltaRot = new Matrix4();
            deltaRot.rotate(-dx * 0.5, 0, 1, 0);  // Y axis (left/right)
            deltaRot.rotate(-dy * 0.5, 1, 0, 0);  // X axis (up/down)
    
            rotationMatrix = deltaRot.multiply(rotationMatrix);
    
            lastMouseX = ev.clientX;
            lastMouseY = ev.clientY;
            renderScene();
        }
    });

    // gl.clearColor(0.96,0.96,0.96,1.0);
    gl.clearColor(0.902, 0.941, 0.933, 1.0);

    rotationMatrix.rotate(-20, 1, 0, 0);
    rotationMatrix.rotate(-30, 0, 1, 0);

    renderScene();
}

function drawTriangle3DWithNormal(vertices, normal) {
    var n = vertices.length / 3;

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    // repeat normal for each vertex
    var normals = [];
    for (var i = 0; i < n; i++) normals.push(...normal);
    var normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Normal);

    gl.drawArrays(gl.TRIANGLES, 0, n);
}

function renderScene() {
    gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, rotationMatrix.elements);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if (dims.w === 10) {
        // two boxes side by side
        var box1 = new Cube();
        box1.color = currentColor;
        box1.matrix.translate(-1, 0, 1);
        box1.matrix.scale(0.75, 0.75, 0.75);
        box1.matrix.translate(0.34, -0.5, -0.5);
        box1.render();
    
        var box2 = new Cube();
        box2.color = currentColor;
        box2.matrix.translate(0, 0, 1);
        box2.matrix.scale(0.75, 0.75, 0.75);
        box2.matrix.translate(0, -0.5, -0.5);
        box2.render();
    } else {
        // single box
        var box = new Cube();
        box.color = currentColor;
        box.matrix.translate(0, 0, 1);
        box.matrix.scale(0.75, 0.75, 0.75);
        box.matrix.translate(-0.5, -0.5, -0.5);
        box.render();
    }
}

let selectedTree = null;

function toggleTreeMenu() {
    document.getElementById('tree-options').classList.toggle('open');
}

function selectTree(tree, el) {
    selectedTree = tree;
    document.querySelectorAll('.tree-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    // update button text to show selection
    document.querySelector('.tree-btn').textContent = tree.charAt(0).toUpperCase() + tree.slice(1) + ' ▾';
    // close the dropdown
    document.querySelector('.tree-btn').classList.add('selected'); //change color when clicked
    document.getElementById('tree-options').classList.remove('open');

    const img = document.getElementById('tree-image');
    const filename = tree.toLowerCase().replace(/ /g, '_');

    img.onerror = function() {
        img.onerror = function() {
            img.style.display = 'none';
            document.getElementById('no-image-msg').style.display = 'block';
        };
        img.src = 'images/' + filename + '.jpg';
    };
    img.src = 'images/' + filename + '.avif';
    document.getElementById('no-image-msg').style.display = 'none';
    img.style.display = 'block';
    
}

// when you click anywhere on the screen off of the tree menu, it closes
document.addEventListener('click', function(ev) {
    const treeGroup = document.querySelector('.tree-group');
    if (!treeGroup.contains(ev.target)) {
        document.getElementById('tree-options').classList.remove('open');
    }
});