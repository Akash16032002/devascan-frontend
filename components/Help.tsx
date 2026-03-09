
import React, { useState } from 'react';
import { InfoIcon, ZapIcon, WandIcon, CodeIcon, CheckCircleIcon } from './icons';

const Help: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'user' | 'dev'>('user');

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between border-b border-brand-border pb-4">
                <h2 className="text-3xl font-bold text-white">Documentation</h2>
                <div className="flex bg-brand-secondary rounded-lg p-1 border border-brand-border">
                    <button
                        onClick={() => setActiveTab('user')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                            activeTab === 'user' ? 'bg-brand-orange text-white shadow-lg' : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        User Guide
                    </button>
                    <button
                        onClick={() => setActiveTab('dev')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                            activeTab === 'dev' ? 'bg-brand-blue text-white shadow-lg' : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        <CodeIcon className="w-4 h-4" />
                        Developer Guide
                    </button>
                </div>
            </div>

            {activeTab === 'user' ? (
                <div className="space-y-8 animate-fadeIn">
                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold text-brand-orange flex items-center gap-2">
                            <ZapIcon className="w-5 h-5" />
                            How It Works
                        </h3>
                        <div className="bg-brand-secondary border border-brand-border rounded-xl p-6 space-y-4 text-gray-300">
                            <p>
                                DevaScan uses advanced AI Vision to analyze handwritten Devanagari documents. It is specially prompted to act as a model fine-tuned on the <strong>Kaggle Devanagari Character Dataset</strong>.
                            </p>
                            <ol className="list-decimal list-inside space-y-2 ml-2">
                                <li>Upload an image containing handwritten Devanagari text.</li>
                                <li>The AI scans the image using <strong>46-class feature mapping</strong>.</li>
                                <li>It returns the exact text along with spatial coordinates.</li>
                                <li>An English summary is automatically generated.</li>
                            </ol>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold text-blue-400 flex items-center gap-2">
                            <InfoIcon className="w-5 h-5" />
                            Understanding the Output
                        </h3>
                        <div className="bg-brand-secondary border border-brand-border rounded-xl p-6 space-y-4 text-gray-300">
                            <p>
                                The output format includes spatial mapping coordinates for every detected line:
                            </p>
                            <div className="bg-brand-dark p-4 rounded-lg font-mono text-sm border border-brand-border/50">
                                <span className="text-brand-orange">[ymin, xmin, ymax, xmax]</span> <span className="text-white">Actual Text Content</span>
                            </div>
                            <ul className="list-disc list-inside space-y-2 ml-2 text-sm text-gray-400">
                                <li><strong>ymin/ymax</strong>: Top and bottom vertical position (0-1000 scale).</li>
                                <li><strong>xmin/xmax</strong>: Left and right horizontal position (0-1000 scale).</li>
                                <li>These numbers tell you exactly <em>where</em> the text belongs in the original image.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold text-purple-400 flex items-center gap-2">
                            <WandIcon className="w-5 h-5" />
                            Troubleshooting
                        </h3>
                        <div className="bg-brand-secondary border border-brand-border rounded-xl p-6 text-gray-300">
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>Low Accuracy?</strong> Ensure the image is well-lit and the handwriting is legible.</li>
                                <li><strong>Missing Summary?</strong> If the extracted text is too short or nonsensical, the summarizer may skip it.</li>
                                <li><strong>Library not saving?</strong> Check if your browser allows local storage cookies.</li>
                            </ul>
                        </div>
                    </section>
                </div>
            ) : (
                <div className="space-y-8 animate-fadeIn">
                    <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl flex items-start gap-3">
                        <InfoIcon className="w-5 h-5 text-blue-400 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-blue-400">Local Training Pipeline</h4>
                            <p className="text-sm text-gray-400">
                                This section documents the architecture required to train the model locally using Python, separate from the web interface.
                            </p>
                        </div>
                    </div>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">1. Dataset Preparation</h3>
                        <div className="bg-brand-secondary border border-brand-border rounded-xl p-6 space-y-4">
                            <p className="text-gray-300">
                                The model is trained on the <strong>Devanagari Handwritten Character Dataset</strong> (Rishi Anand).
                            </p>
                            <ul className="grid grid-cols-2 gap-4">
                                <li className="bg-brand-dark p-3 rounded-lg border border-brand-border/50">
                                    <span className="block text-xs text-gray-500 uppercase">Total Images</span>
                                    <span className="text-lg font-mono text-brand-orange">92,000</span>
                                </li>
                                <li className="bg-brand-dark p-3 rounded-lg border border-brand-border/50">
                                    <span className="block text-xs text-gray-500 uppercase">Classes</span>
                                    <span className="text-lg font-mono text-brand-orange">46</span>
                                </li>
                                <li className="bg-brand-dark p-3 rounded-lg border border-brand-border/50">
                                    <span className="block text-xs text-gray-500 uppercase">Image Size</span>
                                    <span className="text-lg font-mono text-brand-orange">32x32 px</span>
                                </li>
                                <li className="bg-brand-dark p-3 rounded-lg border border-brand-border/50">
                                    <span className="block text-xs text-gray-500 uppercase">Format</span>
                                    <span className="text-lg font-mono text-brand-orange">Grayscale</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">2. Model Architecture (CNN)</h3>
                        <div className="bg-brand-secondary border border-brand-border rounded-xl p-6">
                            <p className="text-gray-400 mb-4">
                                To replicate this locally, implement a Convolutional Neural Network (CNN) using PyTorch or TensorFlow.
                            </p>
                            <div className="bg-brand-dark p-4 rounded-lg overflow-x-auto border border-brand-border/50">
<pre className="text-sm font-mono text-gray-300">
{`import tensorflow as tf
from tensorflow.keras import layers, models

def build_devanagari_model(input_shape=(32, 32, 1), num_classes=46):
    model = models.Sequential([
        # Convolutional Layer 1
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=input_shape),
        layers.MaxPooling2D((2, 2)),
        
        # Convolutional Layer 2
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        
        # Convolutional Layer 3
        layers.Conv2D(64, (3, 3), activation='relu'),
        
        # Dense Layers
        layers.Flatten(),
        layers.Dense(64, activation='relu'),
        layers.Dropout(0.2), # Prevent overfitting
        layers.Dense(num_classes, activation='softmax')
    ])
    
    model.compile(optimizer='adam',
                  loss='categorical_crossentropy',
                  metrics=['accuracy'])
    return model`}
</pre>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">3. Training Hyperparameters</h3>
                        <div className="bg-brand-secondary border border-brand-border rounded-xl overflow-hidden">
                            <table className="w-full text-sm text-left text-gray-400">
                                <thead className="text-xs text-gray-200 uppercase bg-brand-dark/50 border-b border-brand-border">
                                    <tr>
                                        <th className="px-6 py-3">Parameter</th>
                                        <th className="px-6 py-3">Value</th>
                                        <th className="px-6 py-3">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-brand-border/50">
                                        <td className="px-6 py-4 font-medium text-white">Batch Size</td>
                                        <td className="px-6 py-4">32 or 64</td>
                                        <td className="px-6 py-4">Number of samples per gradient update.</td>
                                    </tr>
                                    <tr className="border-b border-brand-border/50">
                                        <td className="px-6 py-4 font-medium text-white">Epochs</td>
                                        <td className="px-6 py-4">25 - 50</td>
                                        <td className="px-6 py-4">Iterations over the entire dataset.</td>
                                    </tr>
                                    <tr className="border-b border-brand-border/50">
                                        <td className="px-6 py-4 font-medium text-white">Optimizer</td>
                                        <td className="px-6 py-4">Adam</td>
                                        <td className="px-6 py-4">Adaptive learning rate optimization.</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-medium text-white">Loss Function</td>
                                        <td className="px-6 py-4">Categorical Crossentropy</td>
                                        <td className="px-6 py-4">Standard for multi-class classification.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">4. Deployment Strategy</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-brand-secondary p-5 rounded-xl border border-brand-border">
                                <div className="bg-green-500/10 w-8 h-8 rounded-full flex items-center justify-center mb-3">
                                    <span className="text-green-500 font-bold">1</span>
                                </div>
                                <h4 className="font-semibold text-white mb-1">Train</h4>
                                <p className="text-xs text-gray-400">Run the Python script on a GPU-enabled machine (e.g., Google Colab) to generate `model.h5`.</p>
                            </div>
                            <div className="bg-brand-secondary p-5 rounded-xl border border-brand-border">
                                <div className="bg-green-500/10 w-8 h-8 rounded-full flex items-center justify-center mb-3">
                                    <span className="text-green-500 font-bold">2</span>
                                </div>
                                <h4 className="font-semibold text-white mb-1">API</h4>
                                <p className="text-xs text-gray-400">Wrap the model in a FastAPI or Flask backend to expose a `/predict` endpoint.</p>
                            </div>
                            <div className="bg-brand-secondary p-5 rounded-xl border border-brand-border">
                                <div className="bg-green-500/10 w-8 h-8 rounded-full flex items-center justify-center mb-3">
                                    <span className="text-green-500 font-bold">3</span>
                                </div>
                                <h4 className="font-semibold text-white mb-1">Connect</h4>
                                <p className="text-xs text-gray-400">Update the React frontend to send the image to your local Python API instead of Gemini.</p>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};

export default Help;
